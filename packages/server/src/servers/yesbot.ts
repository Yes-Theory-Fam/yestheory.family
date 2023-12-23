import {ApolloServer} from '@apollo/server';
import {koaMiddleware} from '@as-integrations/koa';
import {buildHTTPExecutor} from '@graphql-tools/executor-http';
import {stitchSchemas} from '@graphql-tools/stitch';
import {
  FilterRootFields,
  PruneSchema,
  schemaFromExecutor,
} from '@graphql-tools/wrap';
import {isEnumType} from 'graphql/type';
import Koa, {type Middleware} from 'koa';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import {buildSchemaSync} from 'type-graphql';
import {Container} from 'typedi';
import {isDevelopment} from '../config';
import {ExportDirective} from '../graphql-directives';
import {createServerLogger} from '../services/logging/log';
import {
  getResolvers,
  ResolverTarget,
} from '../services/resolvers/resolver-directive';

const logger = createServerLogger('server', 'yesbot');

const allowedPayloadOperations = {
  Query: ['mayOperate'],
  Mutation: ['createUser', 'mimicUserOperation'],
  Subscription: <string[]>[],
};

const requireValidToken: Middleware = async ({headers, res}, next) => {
  const yesbotAuthHeader = headers['x-yesbot-authentication'] ?? '';
  const requiredValue = process.env.YESBOT_API_TOKEN;

  if (yesbotAuthHeader !== requiredValue) {
    res.statusCode = 401;
    return;
  }

  await next();
};

export const launchYesBotServer = async () => {
  const resolvers = await getResolvers(ResolverTarget.YESBOT);
  const yesbotSchema = buildSchemaSync({
    directives: [ExportDirective],
    resolvers,
    container: Container,
    // Authentication is handled through the Koa middleware; this is still required because resolver metadata is stored
    // in a singleton so public endpoints are still detected as requiring authentication.
    authChecker: () => false,
  });

  const port = Number(process.env.BACKEND_PORT ?? 5000) + 1;
  const app = new Koa();
  app.use(requireValidToken);
  app.use(bodyParser());
  app.proxy = !isDevelopment;

  const cmsExecutor = buildHTTPExecutor({
    endpoint: process.env.CMS_ENDPOINT,
    headers: {
      Authorization: `users API-Key ${process.env.CMS_API_KEY}`,
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
      new PruneSchema({skipPruning: (n) => isEnumType(n)}),
    ],
  };

  const stitchedSchema = stitchSchemas({
    subschemas: [yesbotSchema, cmsSchema],
    mergeDirectives: true,
  });

  const server = new ApolloServer({
    schema: stitchedSchema,
    // This is intended to be able to expose the schema for code generation in the CI. The introspection is proxied through yesbot-schema.ts
    introspection: true,
    csrfPrevention: true,
    plugins: [
      {
        async requestDidStart() {
          return {
            async willSendResponse(requestContext) {
              const {response} = requestContext;

              const errors =
                response.body.kind === 'single'
                  ? response.body.singleResult.errors
                  : response.body.initialResult.errors;

              if (errors) {
                logger.error('Error executing graphql resolver', errors);
              }
            },
          };
        },
      },
    ],
  });

  await server.start();
  app.use(mount('/graphql', koaMiddleware(server)));

  app.listen({port}, () => logger.info(`Backend listening on port ${port}`));

  return app;
};
