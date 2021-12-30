import { Resolver } from "../../../services/resolvers/resolver-directive";
import { BuddyProjectEntry } from "@yes-theory-fam/database/type-graphql";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";
import { Guild } from "discord.js";
import { FieldResolver, Root } from "type-graphql";

@Resolver(BuddyProjectEntry)
class BuddyProjectEntryUsernameResolver {
  constructor(
    @Logger("buddy-project", "buddy-project-entry-username")
    private logger: winston.Logger,
    private guild: Guild
  ) {}

  @FieldResolver(() => String, { nullable: true })
  public async username(
    @Root() entry: BuddyProjectEntry
  ): Promise<string | null> {
    const id = entry.userId;
    const member = await this.guild.members.fetch(id);
    if (!member) return null;

    const user = member.user;

    return user.tag ?? `${user.username}#${user.discriminator}`;
  }
}
