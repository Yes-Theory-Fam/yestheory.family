import {type IncomingHttpHeaders} from 'http';
import {type AuthProvider} from '@yestheory.family/server/src/features';
import {Strategy as CustomStrategy} from 'passport-custom';
import payload from 'payload';
import parseCookies from 'payload/dist/utilities/parseCookies';

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
  return Object.fromEntries(
    Object.entries(incoming).map(([k, v]) => [
      k,
      Array.isArray(v) ? v.join(',') : v,
    ]),
  );
};

export const ytfAuthStrategy = new CustomStrategy(async function (req, done) {
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

  const payloadUser = await payload.findByID({
    id: user.id,
    collection: 'users',
  });

  done(null, {collection: 'users', user: payloadUser, id: user.id});
});
