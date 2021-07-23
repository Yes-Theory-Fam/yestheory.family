import { Resolver } from "../../services/resolvers/resolver-directive";
import { Example } from "../../__generated__/type-graphql";
import { Logger } from "../../services/logging/logService";
import winston from "winston";
import { Ctx, Query } from "type-graphql";
import { PrismaContext } from "../../types";

@Resolver(Example)
class TestResolver {
  constructor(
    @Logger("index", "testresolver") private logger: winston.Logger
  ) {}

  @Query(() => [Example])
  async examples(@Ctx() { prisma }: PrismaContext): Promise<Example[]> {
    this.logger.info("Test");
    return await prisma.example.findMany();
  }
}
