import {parseCookies} from 'payload/auth';

type MeQueryMe = null | {id: string};
type MeQueryData = null | {me: MeQueryMe};
type MeQueryResult = {data: MeQueryData};

type AuthState = {userId: string | null; isLoggedIn: boolean};

const backend = process.env.BACKEND_URL ?? 'http://localhost:5000';

const expressToFetchHeaders = (incoming: Headers): HeadersInit => ({
  Cookie: incoming.get('cookie') ?? '',
});

export const getAuthStateFromHeaders = async (
  headers: Headers,
): Promise<AuthState> => {
  const cookies = parseCookies(headers);
  const koaSess = cookies.get('koa.sess');

  if (!koaSess) return {isLoggedIn: false, userId: null};

  const gqlBody = {
    query: 'query Me {\n\tme {\n\t\tid\n\t}\n}\n',
    operationName: 'Me',
  };

  const response = await fetch(`${backend}/graphql`, {
    method: 'POST',
    headers: {
      ...expressToFetchHeaders(headers),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gqlBody),
  });

  const body = (await response.json()) as MeQueryResult;

  const userId = body.data?.me?.id ?? null;
  const isLoggedIn = !!body.data?.me;

  return {userId, isLoggedIn};
};
