import { PrismaClient } from "@prisma/client";

export interface PrismaContext {
  prisma: PrismaClient;
}
