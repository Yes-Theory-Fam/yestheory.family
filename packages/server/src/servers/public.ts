import { ApolloServer, gql } from "apollo-server-koa";
import { Guild } from "discord.js";
import grant from "grant";
import Koa, { Context } from "koa";
import mount from "koa-mount";
import koaSession from "koa-session";
import { BuildSchemaOptions, buildSchemaSync } from "type-graphql";
import { Container } from "typedi";
import { isDevelopment } from "../config";
import grantConfig from "../config/grant";
import sessionConfig from "../config/session";
import { authenticationRouter } from "../features";
import { discordAuthErrorCode } from "../features/auth/auth-service";
import { authChecker } from "../features/auth/graphql-auth-checker";
import { ExportDirective } from "../graphql-directives";
import { createServerLogger } from "../services/logging/log";
import {
  getResolvers,
  ResolverTarget,
} from "../services/resolvers/resolver-directive";
import { YtfApolloContext } from "../types";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { stitchSchemas } from "@graphql-tools/stitch";
import { schemaFromExecutor } from "@graphql-tools/wrap";
import { delegateToSchema } from "@graphql-tools/delegate";
import { OperationTypeNode } from "graphql/language/ast";

const logger = createServerLogger("server", "public");

export const launchPublicServer = async () => {
  const additionalOptions: Partial<BuildSchemaOptions> = {};

  // TODO find a reasonably neat way of providing the required secrets to the CI for e2e tests
  if (process.env.IS_E2E) {
    additionalOptions.authChecker = () => false;
  } else {
    // @ts-expect-error Guild is not considered a Constructable by typedi because it has a private constructor; it still works to resolve the dependency though
    const guild = Container.get<Guild>(Guild);
    additionalOptions.authChecker = authChecker(guild);
  }

  const resolvers = await getResolvers(ResolverTarget.PUBLIC);

  const publicServerSchema = buildSchemaSync({
    directives: [ExportDirective],
    resolvers,
    container: Container,
    ...additionalOptions,
  });

  const cmsExecutor = buildHTTPExecutor({
    endpoint: process.env.CMS_ENDPOINT,
  });
  const cmsSchema = {
    schema: await schemaFromExecutor(cmsExecutor),
    executor: cmsExecutor,
  };

  const stitchedSchema = stitchSchemas({
    subschemas: [publicServerSchema],
    mergeDirectives: true,
    typeDefs: gql`
      extend type Query {
        groupchatSearchToken: String!
      }
    `,
    resolvers: {
      Query: {
        groupchatSearchToken: {
          resolve(parent, _, context, info) {
            return delegateToSchema({
              schema: cmsSchema,
              operation: OperationTypeNode.QUERY,
              fieldName: "searchTokenByAuthenticated",
              args: { isAuthenticated: !!context.user },
              context,
              info,
            });
          },
        },
      },
    },
  });

  const port = process.env["BACKEND_PORT"] ?? 5000;
  const koaGrant = grant.koa();
  const app = new Koa();
  app.keys = ["grant"];
  app.proxy = !isDevelopment;
  app.use(koaSession(sessionConfig, app));
  app.use(mount("/oauth", koaGrant(grantConfig)));
  app.use(authenticationRouter.routes());

  const server = new ApolloServer({
    schema: stitchedSchema,
    context: (req): YtfApolloContext => {
      const ctx: Context = req.ctx;
      const maybeUser = ctx.session?.user;
      const maybeAuth = ctx.session?.auth;

      return {
        user: maybeUser,
        auth: maybeAuth,
        requestContext: ctx,
      };
    },
    formatResponse: (response, reqContext) => {
      const discordAuthError =
        response.errors?.filter((e) => e.message === discordAuthErrorCode) ??
        [];
      for (const authError of discordAuthError) {
        // When the operation requires Discord authentication, we want to return a special code to indicate to the
        // frontend that re-authentication is required.
        if (authError.extensions) {
          authError.extensions.code = discordAuthErrorCode;
        }
      }

      const authErrors =
        response.errors?.filter((e) =>
          e.message.startsWith("Access denied!"),
        ) ?? [];
      const user = (reqContext.context as YtfApolloContext).user;

      for (const authError of authErrors) {
        const code = user ? "UNAUTHORIZED" : "UNAUTHENTICATED";

        if (authError.extensions) authError.extensions.code = code;
      }

      const unknownErrors =
        response.errors?.filter(
          (e) => !discordAuthError.includes(e) && !authErrors.includes(e),
        ) ?? [];
      if (unknownErrors.length > 0) {
        logger.error("Error executing graphql resolver", unknownErrors);
      }

      return response;
    },
  });
  await server.start();
  server.applyMiddleware({
    app,
    cors: { origin: process.env.FRONTEND_HOST, credentials: true },
  });

  app.listen({ port }, () => logger.info(`Backend listening on port ${port}`));

  return app;
};
