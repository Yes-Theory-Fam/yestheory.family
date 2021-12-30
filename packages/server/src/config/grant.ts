import { GrantConfig } from "grant";
import { isDevelopment } from ".";

const {
  BACKEND_PORT,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_SCOPES,
} = process.env;

const origin = isDevelopment
  ? `http://localhost:${BACKEND_PORT ?? 5000}`
  : "https://api.yestheory.family";

const prefix = "/oauth";

const config: GrantConfig = {
  defaults: {
    origin,
    transport: "session",
    prefix,
  },
  discord: {
    state: true,
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    scope: DISCORD_SCOPES?.split(/\s*,\s*/g),
    response: ["tokens", "profile", "raw"],
  },
};

export const grantRoutePrefix = prefix;
export default config;
