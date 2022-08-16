import { GrantConfig } from "grant";

const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_SCOPES,
  FRONTEND_HOST,
} = process.env;

const prefix = "/oauth";

const config: GrantConfig = {
  defaults: {
    origin: FRONTEND_HOST,
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
