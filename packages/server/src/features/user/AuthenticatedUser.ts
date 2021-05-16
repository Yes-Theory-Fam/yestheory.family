import { Field, ObjectType } from "type-graphql";

export interface DiscordProfile {
  id: string;
  username: string;
  avatar: string;
}

@ObjectType()
export class AuthenticatedUser {
  @Field() id: string;
  @Field() username: string;
  @Field() avatarUrl: string;

  constructor(id: string, username: string, avatarUrl: string) {
    this.id = id;
    this.username = username;
    this.avatarUrl = avatarUrl;
  }

  static fromDiscordProfile(profile: DiscordProfile): AuthenticatedUser {
    const avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128`;
    return { id: profile.id, username: profile.username, avatarUrl };
  }
}
