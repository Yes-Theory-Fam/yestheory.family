import "reflect-metadata";

import { PrismaClient } from "@prisma/client";
import { buildSchema, Ctx, Query, Resolver } from "type-graphql";
import { Example } from "./__generated__/type-graphql";
import koa from "koa";
import { ApolloServer } from "apollo-server-koa";

interface PrismaContext {
  prisma: PrismaClient;
}

@Resolver(Example)
class TestResolver {
  @Query(() => [Example])
  async examples(@Ctx() { prisma }: PrismaContext): Promise<Example[]> {
    return await prisma.example.findMany();
  }
}

const prisma = new PrismaClient();

const main = async () => {
  const resolvers: [Function, ...Function[]] = [TestResolver];
  const schema = await buildSchema({ resolvers });

  const port = 5000;
  const app = new koa();

  const server = new ApolloServer({
    schema,
    context: (): PrismaContext => ({ prisma }),
  });
  server.applyMiddleware({ app });

  app.listen({ port }, () => console.log(`Backend listening on port ${port}`));
};

main();
