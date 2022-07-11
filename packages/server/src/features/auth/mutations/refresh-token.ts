import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
} from "type-graphql";
import winston from "winston";
import { Logger } from "../../../services/logging/log-service";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";
import { YtfApolloContext } from "../../../types";
import { AuthService } from "../auth-service";

@ObjectType()
class RefreshTokenPayload {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;

  @Field()
  expiresAt: number;

  constructor(refreshToken: string, accessToken: string, expiresAt: number) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.expiresAt = expiresAt;
  }
}

@Resolver(ResolverTarget.PUBLIC)
class RefreshTokenMutation {
  constructor(
    @Logger("auth", "refreshToken") private logger: winston.Logger,
    private authService: AuthService
  ) {}

  @Authorized()
  @Mutation(() => RefreshTokenPayload)
  async refreshToken(
    @Ctx() ctx: YtfApolloContext,
    @Arg("refreshToken") refreshToken: string
  ): Promise<RefreshTokenPayload> {
    const { user } = ctx;
    if (!user) throw new Error("");

    const {
      accessToken,
      refreshToken: newRefreshToken,
      expiresAt,
    } = await this.authService.refreshToken(refreshToken, user.type);

    return new RefreshTokenPayload(accessToken, newRefreshToken, expiresAt);
  }
}
