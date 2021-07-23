import "reflect-metadata";

import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import { createServerLogger } from "./services/logging/log";
import { Container } from "typedi";
import { getResolvers } from "./services/resolvers/resolver-directive";
import { PrismaContext } from "./types";

const logger = createServerLogger("src", "index");

const prisma = new PrismaClient();

const main = async () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const resolvers = await getResolvers();
  const schema = await buildSchema({ resolvers, container: Container });

  const port = process.env["BACKEND_PORT"] ?? 5000;
  const app = new koa();

  const server = new ApolloServer({
    schema,
    context: (): PrismaContext => ({ prisma }),
  });
  server.applyMiddleware({ app, cors: { origin: "*" } });

  app.listen({ port }, () => logger.info(`Backend listening on port ${port}`));
};

main().then(() => logger.debug("Launched server"));
