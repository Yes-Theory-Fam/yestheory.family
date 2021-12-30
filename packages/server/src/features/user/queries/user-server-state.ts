import { AuthenticatedUser, AuthProvider } from "../authenticated-user";
import { Resolver } from "../../../services/resolvers/resolver-directive";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";
import { Authorized, FieldResolver, Root } from "type-graphql";
import { Guild } from "discord.js";

@Resolver(AuthenticatedUser)
class UserServerStateResolver {
  constructor(
    @Logger("user", "server-state") private logger: winston.Logger,
    private guild: Guild
  ) {}

  @Authorized()
  @FieldResolver(() => Boolean)
  async isOnServer(@Root() user: AuthenticatedUser): Promise<boolean> {
    if (user.type !== AuthProvider.DISCORD) return false;

    try {
      await this.guild.members.fetch(user.id);
      return true;
    } catch {
      return false;
    }
  }
}
