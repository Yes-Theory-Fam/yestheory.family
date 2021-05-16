import { KoaHandler } from "apollo-server-koa/dist/koaApollo";
import { GrantResponse } from "grant";
import { isDevelopment } from "../../config";
import { AuthenticatedUser } from "../user";

const domain = isDevelopment ? "localhost" : "yestheory.family";

const discordCallback: KoaHandler = (ctx) => {
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
  if (!ctx.session) throw new Error("No session found!");

  ctx.session.grant = null;
  ctx.session.user = AuthenticatedUser.fromDiscordProfile(response.profile);
  ctx.session.save();

  ctx.cookies.set(lastLocationKey, null);
  ctx.redirect(lastLocation ?? "http://localhost:3000"); // TODO Dynamic host for development / production
};

export default discordCallback;
