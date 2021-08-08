import { Field, ObjectType } from "type-graphql";

export interface DiscordProfile {
  id: string;
  username: string;
  avatar: string;
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
  @Field() avatarUrl: string;
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
    const avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128`;
    return {
      id: profile.id,
      username: `${profile.username}#${profile.discriminator}`,
      avatarUrl,
      type: AuthProvider.DISCORD,
    };
  }
}
