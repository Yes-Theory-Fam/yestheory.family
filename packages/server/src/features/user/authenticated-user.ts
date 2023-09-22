import { Field, ObjectType } from "type-graphql";

export interface DiscordProfile {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
}

// TODO if there are ever more auth providers, go through all parts of logout to make sure there are no hardcoded values
//  for Discord; I might have been a little lazy on that matter, sorry 'bout that.
export enum AuthProvider {
  DISCORD,
}

@ObjectType()
export class AuthenticatedUser {
  @Field() id: string;
  @Field() username: string;
  @Field(() => String, { nullable: true }) avatarUrl: string | null;
  @Field() type: AuthProvider;

  constructor(
    id: string,
    username: string,
    avatarUrl: string,
    provider: AuthProvider
  ) {
    this.id = id;
    this.username = username;
    this.avatarUrl = avatarUrl;
    this.type = provider;
  }

  static fromDiscordProfile(profile: DiscordProfile): AuthenticatedUser {
    const avatarUrl = profile.avatar
      ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128`
      : null;

    return {
      id: profile.id,
      username: profile.username,
      avatarUrl,
      type: AuthProvider.DISCORD,
    };
  }
}
