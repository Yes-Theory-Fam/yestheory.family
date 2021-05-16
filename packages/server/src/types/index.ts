import { PrismaClient } from "@prisma/client";
import { AuthenticatedUser } from "../features/user";

export interface YtfApolloContext {
  prisma: PrismaClient;
  user: AuthenticatedUser | null;
}
