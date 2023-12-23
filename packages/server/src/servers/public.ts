import {ApolloServer} from '@apollo/server';
import {koaMiddleware} from '@as-integrations/koa';
import {buildHTTPExecutor} from '@graphql-tools/executor-http';
import {stitchSchemas} from '@graphql-tools/stitch';
import {
  FilterRootFields,
  PruneSchema,
  schemaFromExecutor,
} from '@graphql-tools/wrap';
import cors from '@koa/cors';
import {Guild} from 'discord.js';
import grant from 'grant';
import Koa, {type Context} from 'koa';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import koaSession from 'koa-session';
import {type BuildSchemaOptions, buildSchemaSync} from 'type-graphql';
import {Container} from 'typedi';
import {isDevelopment} from '../config';
import grantConfig from '../config/grant';
import sessionConfig from '../config/session';
import {authenticationRouter} from '../features';
import {discordAuthErrorCode} from '../features/auth/auth-service';
import {authChecker} from '../features/auth/graphql-auth-checker';
import {ExportDirective} from '../graphql-directives';
import {createServerLogger} from '../services/logging/log';
import {
  getResolvers,
  ResolverTarget,
} from '../services/resolvers/resolver-directive';
import {type YtfApolloContext} from '../types';

const logger = createServerLogger('server', 'public');

const allowedPayloadOperations = {
  Query: ['groupchatSearchToken'],
  Mutation: <string[]>[],
  Subscription: <string[]>[],
};

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
    credentials: 'include',
    headers: (req) => {
      const headers = {...req?.context?.requestContext.req.headers};
      // The stitching / delegation fiddles with the actual content's length, so we just reset this header
      //   to make sure the full body is parsed on the receiving end.
      headers['content-length'] = undefined;

      return headers;
    },
  });
  const cmsSchema = {
    schema: await schemaFromExecutor(cmsExecutor),
    executor: cmsExecutor,
    transforms: [
      new FilterRootFields(
        (operation, name) =>
          allowedPayloadOperations[operation]?.includes(name) ?? false,
      ),
      new PruneSchema(),
    ],
  };

  const stitchedSchema = stitchSchemas({
    subschemas: [publicServerSchema, cmsSchema],
    mergeDirectives: true,
  });

  const server = new ApolloServer({
    schema: stitchedSchema,
    plugins: [
      {
        async requestDidStart() {
          return {
            async willSendResponse(requestContext) {
              const response = requestContext;

              const discordAuthError =
                response.errors?.filter(
                  (e) => e.message === discordAuthErrorCode,
                ) ?? [];
              for (const authError of discordAuthError) {
                // When the operation requires Discord authentication, we want to return a special code to indicate to the
                // frontend that re-authentication is required.
                if (authError.extensions) {
                  authError.extensions.code = discordAuthErrorCode;
                }
              }

              const authErrors =
                response.errors?.filter((e) =>
                  e.message.startsWith('Access denied!'),
                ) ?? [];
              const user = (requestContext.contextValue as YtfApolloContext)
                .user;

              for (const authError of authErrors) {
                const code = user ? 'UNAUTHORIZED' : 'UNAUTHENTICATED';

                if (authError.extensions) authError.extensions.code = code;
              }

              const unknownErrors =
                response.errors?.filter(
                  (e) =>
                    !discordAuthError.includes(e) && !authErrors.includes(e),
                ) ?? [];
              if (unknownErrors.length > 0) {
                logger.error('Error executing graphql resolver', unknownErrors);
              }
            },
          };
        },
      },
    ],
  });
  await server.start();

  const koaGrant = grant.koa();
  const app = new Koa();
  app.keys = ['grant'];
  app.proxy = !isDevelopment;
  app.use(koaSession(sessionConfig, app));
  app.use(mount('/oauth', koaGrant(grantConfig)));
  app.use(authenticationRouter.routes());
  app.use(bodyParser());
  app.use(cors({origin: process.env.FRONTEND_HOST, credentials: true}));
  app.use(
    mount(
      '/graphql',
      koaMiddleware(server, {
        context: async (req): Promise<YtfApolloContext> => {
          const ctx: Context = req.ctx;
          const maybeUser = ctx.session?.user;
          const maybeAuth = ctx.session?.auth;

          return {
            user: maybeUser,
            auth: maybeAuth,
            requestContext: ctx,
          };
        },
      }),
    ),
  );

  const port = process.env['BACKEND_PORT'] ?? 5000;
  app.listen({port}, () => logger.info(`Backend listening on port ${port}`));

  return app;
};
