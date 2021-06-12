import { KoaHandler } from "apollo-server-koa/dist/koaApollo";
import { GrantResponse } from "grant";
import { isDevelopment } from "../../config";
import { AuthenticatedUser } from "../user";
import { createServerLogger } from "../../services/logging/log";

const logger = createServerLogger("auth", "DiscordCallback");

const domain = isDevelopment ? "localhost" : "yestheory.family";
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

  ctx.cookies.set("access_token", response.access_token, {
    httpOnly: true,
    secure: !isDevelopment,
    sameSite: "strict",
    path: "/",
    domain,
  });

  const lastLocationKey = "last_location";
  const lastLocation = ctx.cookies.get(lastLocationKey);

  ctx.session.grant = null;
  ctx.session.user = AuthenticatedUser.fromDiscordProfile(response.profile);
  ctx.session.save();

  ctx.cookies.set(lastLocationKey, null);

  logger.debug("Redirecting user to lastLocation:", { lastLocation });
  ctx.redirect(lastLocation ?? fallbackRedirect); // TODO Dynamic host for development / production
};

export default discordCallback;
