import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
} from "type-graphql";
import { Resolver } from "../../../services/resolvers/resolver-directive";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";
import { AuthService } from "../auth-service";
import { YtfApolloContext } from "../../../types";

@ObjectType()
class RefreshTokenPayload {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;

  @Field()
  expiresIn: number;

  constructor(refreshToken: string, accessToken: string, expiresIn: number) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
  }
}

@Resolver()
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
      expiresIn,
    } = await this.authService.refreshToken(refreshToken, user.type);

    return new RefreshTokenPayload(accessToken, newRefreshToken, expiresIn);
  }
}
