import { KoaHandler } from "apollo-server-koa/dist/koaApollo";
import { GrantResponse } from "grant";
import { isDevelopment } from "../../config";
import { AuthenticatedUser } from "../user";
import { createServerLogger } from "../../services/logging/log";
import { URL, URLSearchParams } from "url";

const logger = createServerLogger("auth", "DiscordCallback");

const fallbackRedirect = isDevelopment
  ? "http://localhost:3000"
  : "https://yestheory.family";

const discordCallback: KoaHandler = (ctx) => {
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
  const urlParams = new URLSearchParams({
    next: lastLocation,
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
  });

  const redirectUrl = `${urlBase}?${urlParams.toString()}`;

  logger.debug("Redirecting user to lastLocation:", {
    redirectUrl,
  });

  ctx.redirect(redirectUrl);
};

export default discordCallback;
