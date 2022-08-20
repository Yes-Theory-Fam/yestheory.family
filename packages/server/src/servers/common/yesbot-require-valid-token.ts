import { Middleware } from "koa";

export const requireValidToken: Middleware = async ({ headers, res }, next) => {
  const yesbotAuthHeader = headers["x-yesbot-authentication"] ?? "";
  const requiredValue = process.env.YESBOT_API_TOKEN;

  if (yesbotAuthHeader !== requiredValue) {
    res.statusCode = 401;
    return;
  }

  await next();
};
