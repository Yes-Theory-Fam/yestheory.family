import { Guild } from "discord.js";
import { FieldResolver, Root } from "type-graphql";
import winston from "winston";
import { BuddyProjectEntry } from "../../../__generated__/type-graphql";
import { Logger } from "../../../services/logging/log-service";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";

@Resolver(ResolverTarget.PUBLIC, BuddyProjectEntry)
class BuddyProjectEntryUsernameResolver {
  constructor(
    @Logger("buddy-project", "buddy-project-entry-username")
    private logger: winston.Logger,
    private guild: Guild,
  ) {}

  @FieldResolver(() => String, { nullable: true })
  public async username(
    @Root() entry: BuddyProjectEntry,
  ): Promise<string | null> {
    const id = entry.userId;
    const member = await this.guild.members.fetch(id);
    if (!member) return null;

    const user = member.user;

    return user.tag ?? `${user.username}#${user.discriminator}`;
  }
}
