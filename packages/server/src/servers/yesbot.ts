import {ApolloServer} from 'apollo-server-koa';
import Koa, {type Middleware} from 'koa';
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
  const schema = buildSchemaSync({
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
  app.proxy = !isDevelopment;

  const server = new ApolloServer({
    schema,
    // This is intended to be able to expose the schema for code generation in the CI. The introspection is proxied through yesbot-schema.ts
    introspection: true,
    csrfPrevention: true,
    formatResponse: (response) => {
      if (response.errors) {
        logger.error('Error executing graphql resolver', response.errors);
      }

      return response;
    },
  });

  await server.start();
  server.applyMiddleware({app});

  app.listen({port}, () => logger.info(`Backend listening on port ${port}`));

  return app;
};
