import { KoaHandler } from "apollo-server-koa/dist/koaApollo";
import { constants } from "http2";

const cookieConsentName = "ytf-cookie-consent";

export const requireCookieConsent: KoaHandler = async (ctx, next) => {
  const consent = ctx.cookies.get(cookieConsentName);
  if (consent && Number(consent) < Date.now()) {
    return await next();
  }

  ctx.status = constants.HTTP_STATUS_UNAVAILABLE_FOR_LEGAL_REASONS;
  ctx.body =
    "User did not consent to the use of cookies so they shall be banished from using this backend!";
};
