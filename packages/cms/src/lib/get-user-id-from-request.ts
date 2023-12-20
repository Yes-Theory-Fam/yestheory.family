import type {IncomingHttpHeaders} from 'http';
import type {AuthProvider} from '@yestheory.family/server/src/features';
import {type Request} from 'express';
import parseCookies from 'payload/dist/utilities/parseCookies';

type MeQueryMe = null | {
  id: string;
  username: string;
  avatarUrl: string;
  provider: AuthProvider;
};
type MeQueryData = null | {me: MeQueryMe};
type MeQueryResult = {data: MeQueryData};

const backend = process.env.BACKEND_URL ?? 'http://localhost:5000';

const expressToFetchHeaders = (incoming: IncomingHttpHeaders): HeadersInit => {
  return {Cookie: incoming.cookie};
};

export const getUserIdFromRequest = async (req: Request) => {
  const cookies = parseCookies(req);
  const koaSess = cookies['koa.sess'];

  if (!koaSess) return null;

  const gqlBody = {
    query: 'query Me {\n\tme {\n\t\tid\n\t}\n}\n',
    operationName: 'Me',
  };

  const response = await fetch(`${backend}/graphql`, {
    method: 'POST',
    headers: {
      ...expressToFetchHeaders(req.headers),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gqlBody),
  });

  const body = (await response.json()) as MeQueryResult;

  return body.data?.me.id;
};
