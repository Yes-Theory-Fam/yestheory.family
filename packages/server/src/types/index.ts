import { PrismaClient } from "@prisma/client";
import { AuthenticatedUser } from "../features";

export interface YtfApolloContext {
  prisma: PrismaClient;
  user: AuthenticatedUser | null;
}
