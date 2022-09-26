import { AuthenticatedUser } from "../features";
import koa from "koa";
import { YtfAuthContext } from "../features/auth/auth-service";

export interface YtfApolloContext {
  user: AuthenticatedUser | null;
  requestContext: koa.Context;
  auth: YtfAuthContext;
}
