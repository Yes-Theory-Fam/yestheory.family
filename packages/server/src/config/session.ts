import { opts } from "koa-session";
import { isDevelopment } from "./index";

const sessionConfig: Partial<opts> = {
  key: "koa.sess",
  secure: !isDevelopment,
  sameSite: "lax",
  path: "/",
};

export default sessionConfig;
