import { ApolloServer } from "apollo-server-koa";
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
import { authChecker } from "../features/auth/graphql-auth-checker";
import { requireCookieConsent } from "../features/auth/require-cookie-consent";
import { ExportDirective, WithDiscordDirective } from "../graphql-directives";
import { createServerLogger } from "../services/logging/log";
import {
  getResolvers,
  ResolverTarget,
} from "../services/resolvers/resolver-directive";
import { YtfApolloContext } from "../types";

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

  const schema = buildSchemaSync({
    directives: [ExportDirective, WithDiscordDirective],
    resolvers,
    container: Container,
    ...additionalOptions,
  });

  const port = process.env["BACKEND_PORT"] ?? 5000;
  const koaGrant = grant.koa();
  const app = new Koa();
  app.keys = ["grant"];
  app.proxy = !isDevelopment;
  app.use(requireCookieConsent);
  app.use(koaSession(sessionConfig, app));
  app.use(mount("/oauth", koaGrant(grantConfig)));
  app.use(authenticationRouter.routes());

  const server = new ApolloServer({
    schema,
    context: (req): YtfApolloContext => {
      const ctx: Context = req.ctx;
      const maybeUser = ctx.session?.user;

      const authHeaderPrefix = "Bearer ";
      const authHeader = ctx.headers.authorization;
      if (authHeader && !authHeader.startsWith(authHeaderPrefix)) {
        throw new Error(
          "Bad Request! Auth header present but not a Bearer token"
        );
      }

      const accessToken = authHeader?.substring(authHeaderPrefix.length);

      return {
        user: maybeUser,
        requestContext: ctx,
        accessToken,
      };
    },
    formatResponse: (response, reqContext) => {
      if (response.errors) {
        logger.error("Error executing graphql resolver", response.errors);
      }

      const authErrors =
        response.errors?.filter((e) =>
          e.message.startsWith("Access denied!")
        ) ?? [];
      const user = (reqContext.context as YtfApolloContext).user;

      const requiresDiscord =
        reqContext.operation?.directives?.some(
          (d) => d.name.value === "withDiscord"
        ) ?? false;

      for (const authError of authErrors) {
        // When the operation requires Discord authentication, we want to return a special code to indicate to the
        // frontend that re-authentication is required.
        const code = requiresDiscord
          ? "DISCORD_UNAUTHENTICATED"
          : user
          ? "UNAUTHORIZED"
          : "UNAUTHENTICATED";

        if (authError.extensions) authError.extensions.code = code;
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
