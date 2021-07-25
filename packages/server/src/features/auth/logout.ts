import { Resolver } from "../../services/resolvers/resolver-directive";
import { Logger } from "../../services/logging/logService";
import winston from "winston";
import { Authorized, Ctx, Mutation } from "type-graphql";
import { YtfApolloContext } from "../../types";
import { AuthProvider } from "../user";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

import Cookies from "cookies";

const revokeUrls: Record<AuthProvider, string> = {
  [AuthProvider.DISCORD]: "https://discord.com/api/oauth2/token/revoke",
};

@Resolver()
class LogoutMutation {
  constructor(@Logger("auth", "logout") private logger: winston.Logger) {}

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: YtfApolloContext): Promise<boolean> {
    if (!ctx.user) throw new Error("Unauthenticated");

    const cookies = ctx.requestContext.cookies;
    await LogoutMutation.invalidateToken(cookies, ctx.user.type);
    cookies.set("koa.sess", null);
    cookies.set("koa.sess.sig", null);

    return true;
  }

  private static async invalidateToken(
    cookies: Cookies,
    provider: AuthProvider
  ): Promise<void> {
    const tokenCookieName = "access_token";

    const token = cookies.get(tokenCookieName);
    if (!token) return;

    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;

    const revokeUrl = revokeUrls[provider];
    const body = new URLSearchParams({
      token,
      client_id: clientId,
      client_secret: clientSecret,
    });

    await fetch(revokeUrl, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/www-form-urlencoded",
      },
    });

    cookies.set(tokenCookieName, null);
    cookies.set(`${tokenCookieName}.sig`, null);
  }
}
