import { Prisma, PrismaClient } from "@prisma/client";
import { Client, Guild, GuildMember, Role, Snowflake } from "discord.js";
import {
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import winston from "winston";
import { Logger } from "../../../services/logging/log-service";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";
import { YtfApolloContext } from "../../../types";
import { AuthService } from "../../auth/auth-service";
import { AuthProvider } from "../../user";
import {
  BuddyProjectStatus,
  BuddyProjectStatusPayload,
} from "../buddy-project-status";
import { BuddyProjectService } from "../services/buddy-project.service";

enum SignUpResult {
  FULL_SUCCESS = "FULL_SUCCESS",
  SUCCESS_DMS_CLOSED = "SUCCESS_DMS_CLOSED",
  FAILURE = "FAILURE",
}

registerEnumType(SignUpResult, { name: "SignUpResult" });

@ObjectType()
class WebSignUpResult {
  @Field(() => SignUpResult) result: SignUpResult;
  @Field() status: BuddyProjectStatusPayload;

  constructor(result: SignUpResult, status?: BuddyProjectStatusPayload) {
    this.result = result;
    this.status =
      status ?? new BuddyProjectStatusPayload(BuddyProjectStatus.NOT_SIGNED_UP);
  }
}

@Resolver(ResolverTarget.PUBLIC)
class SignUpMutation {
  constructor(
    @Logger("buddy-project", "signup") private logger: winston.Logger,
    private discord: Client,
    private guild: Guild,
    private prisma: PrismaClient,
    private authService: AuthService,
    private buddyProjectService: BuddyProjectService,
  ) {}

  @Authorized()
  @Mutation(() => WebSignUpResult)
  public async buddyProjectSignUp(
    @Ctx() ctx: YtfApolloContext,
  ): Promise<WebSignUpResult> {
    const { user } = ctx;

    const auth = await this.authService.ensureValidToken(ctx);

    if (!user || user.type !== AuthProvider.DISCORD) {
      return new WebSignUpResult(SignUpResult.FAILURE);
    }

    // See https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
    const uniqueConstraintFailedCode = "P2002";

    let member: GuildMember | undefined;
    try {
      member = await this.guild.members.fetch(user.id);
    } catch (e) {
      this.logger.debug("Could not find requested member on the server: ", {
        id: user.id,
      });
    }

    if (!member) {
      await this.addMember(auth.accessToken, user.id);
      member = await this.guild.members.fetch(user.id);

      if (!member) {
        return new WebSignUpResult(SignUpResult.FAILURE);
      }
    } else {
      const bpRole = this.getBuddyProjectRole();
      await member.roles.add(bpRole);
    }

    try {
      await this.prisma.buddyProjectEntry.create({ data: { userId: user.id } });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === uniqueConstraintFailedCode
      ) {
        const status = await this.buddyProjectService.getBuddyProjectStatus(
          user.id,
        );

        return new WebSignUpResult(SignUpResult.FAILURE, status);
      }

      throw e;
    }

    this.logger.debug(`Signed up ${user.id} to the buddy project.`);
    const dmChannel = await member.createDM();
    const smileEmote =
      this.guild.emojis.cache.find((e) => e.name === "yesbot_smile") ?? "🦥";

    const successStatus = new BuddyProjectStatusPayload(
      BuddyProjectStatus.SIGNED_UP,
      null,
    );

    try {
      await dmChannel.send(
        `Hooray, you are signed up to the buddy project! As mentioned on the website, it might take some time until you are matched. Have patience, I will message you again soon ${smileEmote}`,
      );
    } catch {
      return new WebSignUpResult(
        SignUpResult.SUCCESS_DMS_CLOSED,
        successStatus,
      );
    }

    return new WebSignUpResult(SignUpResult.FULL_SUCCESS, successStatus);
  }

  private getBuddyProjectRole(): Role {
    const roleName = `Buddy Project ${new Date().getFullYear()}`;

    const bpRole = this.guild.roles.cache.find(
      (role) => role.name === roleName,
    );

    if (!bpRole) {
      throw new Error(
        `Could not find a role with the name '${roleName}' in the specified guild!`,
      );
    }

    return bpRole;
  }

  private async addMember(
    accessToken: string,
    userId: Snowflake,
  ): Promise<void> {
    if (!accessToken) return;
    const bpRole = this.getBuddyProjectRole();

    // Let's just blindly pretend this is going to work first try for now
    await this.guild.members.add(userId, { accessToken, roles: [bpRole] });
  }
}
