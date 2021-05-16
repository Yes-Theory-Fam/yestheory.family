import "reflect-metadata";
import { config } from "dotenv";
config();

import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import Koa, { Context } from "koa";
import koaSession from "koa-session";
import { ApolloServer } from "apollo-server-koa";
import grant from "grant";
import grantConfig from "./config/grant";
import sessionConfig from "./config/session";
import { createServerLogger } from "./services/logging/log";
import mount from "koa-mount";
import { authenticationRouter, resolvers } from "./features";
import { YtfApolloContext } from "./types";
import { Container } from "typedi";

const logger = createServerLogger("src", "index");

const prisma = new PrismaClient();

const main = async () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const schema = await buildSchema({ resolvers, container: Container });

  const port = process.env["BACKEND_PORT"] ?? 5000;
  const koaGrant = grant.koa();
  const app = new Koa();
  app.keys = ["grant"];
  app.use(koaSession(sessionConfig, app));
  app.use(mount("/oauth", koaGrant(grantConfig)));
  app.use(authenticationRouter.routes());

  const server = new ApolloServer({
    schema,
    context: (req): YtfApolloContext => {
      const ctx: Context = req.ctx;
      const maybeUser = ctx.session?.user;

      return { prisma, user: maybeUser };
    },
  });
  server.applyMiddleware({
    app,
    cors: { origin: "http://localhost:3000", credentials: true },
  });

  app.listen({ port }, () => logger.info(`Backend listening on port ${port}`));
};

main().then(() => logger.debug("Launched server"));
