import { Guild } from "discord.js";
import { Authorized, FieldResolver, Root } from "type-graphql";
import winston from "winston";
import { Logger } from "../../../services/logging/log-service";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";
import { AuthenticatedUser, AuthProvider } from "../authenticated-user";

@Resolver(ResolverTarget.PUBLIC, AuthenticatedUser)
class UserServerStateResolver {
  constructor(
    @Logger("user", "server-state") private logger: winston.Logger,
    private guild: Guild,
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
