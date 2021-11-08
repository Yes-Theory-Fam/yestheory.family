import { GrantResponse } from "grant";
import { AuthenticatedUser } from "../user";
import { createServerLogger } from "../../services/logging/log";
import { URL, URLSearchParams } from "url";
import { Middleware } from "@koa/router";
import { YtfApolloContext } from "../../types";

const logger = createServerLogger("auth", "DiscordCallback");

const fallbackRedirect = process.env.FRONTEND_HOST ?? "https://example.com";

const discordCallback: Middleware<unknown, YtfApolloContext> = (ctx) => {
  logger.debug("Received oAuth callback for Discord");

  if (!ctx.session) {
    logger.error("No session found!");
    throw new Error("No session found!");
  }

  const response = ctx.session?.grant.response as GrantResponse;

  const lastLocationKey = "last_location";
  const lastLocation = ctx.cookies.get(lastLocationKey) ?? fallbackRedirect;

  ctx.session.grant = null;
  ctx.session.user = AuthenticatedUser.fromDiscordProfile(response.profile);
  ctx.session.save();

  ctx.cookies.set(lastLocationKey, null);

  const url = new URL(lastLocation);
  const urlBase = `${url.protocol}//${url.host}/auth-redirect`;
  const expiresAt = Date.now() + parseInt(response.raw.expires_in) * 1000;

  const urlParams = new URLSearchParams({
    next: lastLocation,
    accessToken: response.access_token ?? "",
    refreshToken: response.refresh_token ?? "",
    expiresAt: expiresAt.toString(),
  });

  const redirectUrl = `${urlBase}?${urlParams.toString()}`;

  logger.debug("Redirecting user to lastLocation:", { urlBase });

  ctx.redirect(redirectUrl);
};

export default discordCallback;
