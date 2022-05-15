import { constants } from "http2";
import { Middleware } from "koa";
import { YtfApolloContext } from "../../types";

const cookieConsentName = "ytf-cookie-consent";

export const requireCookieConsent: Middleware<
  unknown,
  YtfApolloContext
> = async (ctx, next) => {
  if (ctx.req.method === "OPTIONS") {
    return await next();
  }

  const consent = ctx.cookies.get(cookieConsentName);
  if (consent && Number(consent) < Date.now()) {
    return await next();
  }

  ctx.status = constants.HTTP_STATUS_UNAVAILABLE_FOR_LEGAL_REASONS;
  ctx.body =
    "User did not consent to the use of cookies so they shall be banished from using this backend!";
};
