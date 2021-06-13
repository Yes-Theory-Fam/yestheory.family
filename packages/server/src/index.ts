import "reflect-metadata";
import { config } from "dotenv";
config();

import { PrismaClient } from "@yes-theory-fam/database";
import { buildSchema } from "type-graphql";
import Koa, { Context } from "koa";
import koaSession from "koa-session";
import { ApolloServer } from "apollo-server-koa";
import grant from "grant";
import grantConfig from "./config/grant";
import sessionConfig from "./config/session";
import { createServerLogger } from "./services/logging/log";
import mount from "koa-mount";
import { authenticationRouter, resolvers, Discord } from "./features";
import { YtfApolloContext } from "./types";
import { Container } from "typedi";
import { authChecker } from "./features/auth/graphqlAuthChecker";

const logger = createServerLogger("src", "index");

const prisma = new PrismaClient();

const main = async () => {
  await Discord.initialize();

  const schema = await buildSchema({
    resolvers,
    container: Container,
    authChecker,
  });

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
      logger.debug("Creating context with user", maybeUser);

      return { prisma, user: maybeUser };
    },
    formatResponse: (response, reqContext) => {
      const authErrors =
        response.errors?.filter((e) =>
          e.message.startsWith("Access denied!")
        ) ?? [];
      const user = (reqContext.context as YtfApolloContext).user;
      for (const authError of authErrors) {
        const code = user ? "UNAUTHORIZED" : "UNAUTHENTICATED";
        if (authError.extensions) authError.extensions.code = code;
      }
      return response;
    },
  });
  server.applyMiddleware({
    app,
    cors: { origin: "http://localhost:3000", credentials: true },
  });

  app.listen({ port }, () => logger.info(`Backend listening on port ${port}`));
};

main().then(() => logger.debug("Launched server"));
