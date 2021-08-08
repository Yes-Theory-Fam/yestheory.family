import { Authorized, Ctx, Mutation } from "type-graphql";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";
import { YtfApolloContext } from "../../../types";
import { AuthProvider } from "../../user";
import {
  BuddyProjectStatus,
  BuddyProjectStatusPayload,
} from "../buddy-project-status";
import { Resolver } from "../../../services/resolvers/resolver-directive";
import { Client, DiscordAPIError, Guild, GuildMember, Role } from "discord.js";
import { AuthService } from "../../auth/auth-service";

@Resolver()
class SignUpMutation {
  constructor(
    @Logger("buddy-project", "signup") private logger: winston.Logger,
    private discord: Client,
    private guild: Guild,
    private authService: AuthService
  ) {}

  @Authorized()
  @Mutation(() => BuddyProjectStatusPayload)
  public async signUp(
    @Ctx() ctx: YtfApolloContext
  ): Promise<BuddyProjectStatusPayload> {
    const { prisma, user } = ctx;

    if (!user || user.type !== AuthProvider.DISCORD) {
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
      await this.addMember(ctx);
    } else {
      const bpRole = this.getBuddyProjectRole();
      await member.roles.add(bpRole);
    }

    try {
      await prisma.buddyProjectEntry.create({ data: { userId: user.id } });
    } catch (e) {
      if (e.code === uniqueConstraintFailedCode) {
        throw new Error("User already signed up!");
      }

      throw e;
    }

    this.logger.debug(`Signed up ${user.id} to the buddy project.`);
    return new BuddyProjectStatusPayload(BuddyProjectStatus.SIGNED_UP, null);
  }

  private getBuddyProjectRole(): Role {
    const bpRole = this.guild.roles.cache.find(
      (role) => role.name === "Buddy Project 2021"
    );

    if (!bpRole) {
      throw new Error(
        "Could not find a role with the name 'Buddy Project 2021' in the specified guild!"
      );
    }

    return bpRole;
  }

  private async addMember(ctx: YtfApolloContext): Promise<void> {
    const { accessToken, user } = ctx;
    if (!user) throw new Error("No user");

    if (!accessToken) return;
    const bpRole = this.getBuddyProjectRole();

    try {
      await this.guild.members.add(user.id, { accessToken, roles: [bpRole] });
    } catch (e) {
      if (e instanceof DiscordAPIError && e.httpStatus === 403) {
        const newContext = await this.authService.refreshToken(ctx);
        await this.addMember(newContext);
        return;
      }

      throw e;
    }
  }
}
