import { Resolver } from "../../../services/resolvers/resolver-directive";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";
import { Authorized, Ctx, Mutation } from "type-graphql";
import { YtfApolloContext } from "../../../types";
import { AuthProvider } from "../../user";

import Cookies from "cookies";
import { AuthService } from "../auth-service";

@Resolver()
class LogoutMutation {
  constructor(
    @Logger("auth", "logout") private logger: winston.Logger,
    private authService: AuthService
  ) {}

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: YtfApolloContext): Promise<boolean> {
    if (!ctx.user) throw new Error("Unauthenticated");

    const cookies = ctx.requestContext.cookies;
    await this.invalidateTokens(cookies, ctx.user.type);
    cookies.set("koa.sess", null);
    cookies.set("koa.sess.sig", null);

    return true;
  }

  private async invalidateTokens(cookies: Cookies, provider: AuthProvider) {
    const cookieNames = ["access_token", "refresh_token"];

    const tokens = cookieNames
      .map((n) => cookies.get(n))
      .filter((t): t is string => !!t);

    const invalidatePromises = tokens.map((t) =>
      this.authService.invalidateToken(t, provider)
    );

    await Promise.all(invalidatePromises);
  }
}
