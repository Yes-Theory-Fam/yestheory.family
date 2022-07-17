import { AuthenticatedUser } from "../features";
import koa from "koa";

export interface YtfApolloContext {
  user: AuthenticatedUser | null;
  requestContext: koa.Context;
  accessToken: string | undefined;
}
