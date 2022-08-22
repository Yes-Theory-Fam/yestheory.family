import { Prisma, PrismaClient } from "@prisma/client";
import { Client, Guild, GuildMember, Role, Snowflake } from "discord.js";
import { Authorized, Ctx, Mutation } from "type-graphql";
import winston from "winston";
import { Logger } from "../../../services/logging/log-service";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";
import { YtfApolloContext } from "../../../types";
import { AuthProvider } from "../../user";
import {
  BuddyProjectStatus,
  BuddyProjectStatusPayload,
} from "../buddy-project-status";

@Resolver(ResolverTarget.PUBLIC)
class SignUpMutation {
  constructor(
    @Logger("buddy-project", "signup") private logger: winston.Logger,
    private discord: Client,
    private guild: Guild,
    private prisma: PrismaClient
  ) {}

  @Authorized()
  @Mutation(() => BuddyProjectStatusPayload)
  public async signUp(
    @Ctx() ctx: YtfApolloContext
  ): Promise<BuddyProjectStatusPayload> {
    const { user, accessToken } = ctx;

    if (!user || user.type !== AuthProvider.DISCORD || !accessToken) {
      throw new Error("Cannot sign up user who isn't logged in with Discord!");
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
      await this.addMember(accessToken, user.id);
      member = await this.guild.members.fetch(user.id);

      if (!member) {
        throw new Error(`Couldn't add user ${user.id} to the server`);
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
        throw new Error("User already signed up!");
      }

      throw e;
    }

    this.logger.debug(`Signed up ${user.id} to the buddy project.`);
    const dmChannel = await member.createDM();
    const smileEmote =
      this.guild.emojis.cache.find((e) => e.name === "yesbot_smile") ?? "🦥";

    await dmChannel.send(
      `Hooray, you are signed up to the buddy project! As mentioned on the website, it might take some time until you are matched. Have patience, I will message you again soon ${smileEmote}`
    );

    return new BuddyProjectStatusPayload(BuddyProjectStatus.SIGNED_UP, null);
  }

  private getBuddyProjectRole(): Role {
    const roleName = `Buddy Project ${new Date().getFullYear()}`;

    const bpRole = this.guild.roles.cache.find(
      (role) => role.name === roleName
    );

    if (!bpRole) {
      throw new Error(
        `Could not find a role with the name '${roleName}' in the specified guild!`
      );
    }

    return bpRole;
  }

  private async addMember(
    accessToken: string,
    userId: Snowflake
  ): Promise<void> {
    if (!accessToken) return;
    const bpRole = this.getBuddyProjectRole();

    // Let's just blindly pretend this is going to work first try for now
    await this.guild.members.add(userId, { accessToken, roles: [bpRole] });
  }
}
