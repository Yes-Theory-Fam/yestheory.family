import { PrismaClient } from "@prisma/client";
import { AuthenticatedUser } from "../features";
import koa from "koa";

export interface YtfApolloContext {
  prisma: PrismaClient;
  user: AuthenticatedUser | null;
  requestContext: koa.Context;
  accessToken: string | undefined;
}
