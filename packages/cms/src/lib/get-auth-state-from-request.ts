import type {IncomingHttpHeaders} from 'http';
import {type Request} from 'express';
import parseCookies from 'payload/dist/utilities/parseCookies';

type MeQueryMe = null | {id: string};
type MeQueryData = null | {me: MeQueryMe};
type MeQueryResult = {data: MeQueryData};

type AuthState = {userId: string | null; isLoggedIn: boolean};

const backend = process.env.BACKEND_URL ?? 'http://localhost:5000';

const expressToFetchHeaders = (incoming: IncomingHttpHeaders): HeadersInit => ({
  Cookie: incoming.cookie,
});

export const getAuthStateFromRequest = async (
  req: Request,
): Promise<AuthState> => {
  const cookies = parseCookies(req);
  const koaSess = cookies['koa.sess'];

  if (!koaSess) return {isLoggedIn: false, userId: null};

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

  const userId = body.data?.me?.id ?? null;
  const isLoggedIn = !!body.data?.me;

  return {userId, isLoggedIn};
};
