import "reflect-metadata";
import { config } from "dotenv";
config();

import { PrismaClient } from "@yes-theory-fam/database/client";
import { buildSchemaSync } from "type-graphql";
import Koa, { Context } from "koa";
import koaSession from "koa-session";
import { ApolloServer } from "apollo-server-koa";
import grant from "grant";
import grantConfig from "./config/grant";
import sessionConfig from "./config/session";
import { createServerLogger } from "./services/logging/log";
import mount from "koa-mount";
import { authenticationRouter, Discord } from "./features";
import { YtfApolloContext } from "./types";
import { Container } from "typedi";
import { authChecker } from "./features/auth/graphql-auth-checker";
import { ExportDirective } from "./graphql-directives";

import { getResolvers } from "./services/resolvers/resolver-directive";
import { Client, Guild } from "discord.js";

const logger = createServerLogger("src", "index");

const prisma = new PrismaClient();

const main = async () => {
  const { client, guild } = await Discord.initialize();
  Container.set(Client, client);
  Container.set(Guild, guild);

  const resolvers = await getResolvers();

  const schema = buildSchemaSync({
    directives: [ExportDirective],
    resolvers,
    container: Container,
    authChecker: authChecker(guild),
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

      const authHeaderPrefix = "Bearer ";
      const authHeader = ctx.headers.authorization;
      if (authHeader && !authHeader.startsWith(authHeaderPrefix)) {
        throw new Error(
          "Bad Request! Auth header present but not a Bearer token"
        );
      }

      const accessToken = authHeader?.substr(authHeaderPrefix.length);

      return {
        prisma,
        user: maybeUser,
        requestContext: ctx,
        accessToken,
      };
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
