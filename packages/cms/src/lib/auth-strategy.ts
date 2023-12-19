import {type IncomingHttpHeaders} from 'http';
import {type AuthProvider} from '@yestheory.family/server/src/features';
import {Strategy as CustomStrategy, type VerifyCallback} from 'passport-custom';
import payload, {type GeneratedTypes} from 'payload';
import parseCookies from 'payload/dist/utilities/parseCookies';
import {NotFound} from 'payload/errors';

const backend = process.env.BACKEND_URL ?? 'http://localhost:5000';

type MeQueryMe = null | {
  id: string;
  username: string;
  avatarUrl: string;
  provider: AuthProvider;
};
type MeQueryData = null | {me: MeQueryMe};
type MeQueryResult = {data: MeQueryData};

const expressToFetchHeaders = (incoming: IncomingHttpHeaders): HeadersInit => {
  return {Cookie: incoming.cookie};
};

const toRequestUser = (user: GeneratedTypes['collections']['users']) => ({
  collection: 'users',
  id: user.id,
  user,
});

type AsyncVerifyCallback = (
  ...args: Parameters<VerifyCallback>
) => Promise<void>;
const login: AsyncVerifyCallback = async (req, done) => {
  const gqlBody = {
    query: 'query Test {\n\tme {\n\t\tid\n\t}\n}\n',
    operationName: 'Test',
  };

  const cookies = parseCookies(req);
  const koaSess = cookies['koa.sess'];
  if (!koaSess) {
    return done('Not logged in');
  }

  const response = await fetch(`${backend}/graphql`, {
    method: 'POST',
    headers: {
      ...expressToFetchHeaders(req.headers),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gqlBody),
  });

  const body = (await response.json()) as MeQueryResult;

  const user = body.data?.me;
  if (!user) {
    return done('Unauthenticated');
  }

  try {
    const payloadUser = await payload.findByID({
      id: user.id,
      collection: 'users',
    });

    done(null, toRequestUser(payloadUser));
  } catch (e) {
    if (e instanceof NotFound) {
      const createdUser = await payload.create({
        collection: 'users',
        data: {id: user.id, roles: []},
      });

      return done(null, toRequestUser(createdUser));
    }
    console.error(e);
    done('Unauthenticated', null);
  }
};

export const ytfAuthStrategy = new CustomStrategy(async (req, done) =>
  login(req, done).catch((err) => {
    console.error(err);
    done(err);
  }),
);
