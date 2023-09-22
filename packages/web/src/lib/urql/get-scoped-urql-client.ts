import {
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
  Client,
  Exchange,
  SSRExchange,
} from "@urql/core";

const composeWorkingHeaders = () => {
  const headersProxy = require("next/headers").headers();

  return Object.fromEntries(headersProxy.entries());
};

export function getScopedUrqlClient(withSsrExchange: false): Client;
export function getScopedUrqlClient(
  withSsrExchange: true
): [Client, SSRExchange];
export function getScopedUrqlClient(
  withSsrExchange: boolean
): Client | [Client, SSRExchange | undefined] {
  const isServer = typeof window === "undefined";
  console.log(process.env.SERVER_BACKEND_GRAPHQL_URL);
  const url = isServer ? process.env.SERVER_BACKEND_GRAPHQL_URL : "/graphql";

  const ssr = withSsrExchange ? ssrExchange() : undefined;

  const exchanges: (Exchange | undefined)[] = [cacheExchange];
  if (withSsrExchange) exchanges.push(ssr);
  exchanges.push(fetchExchange);

  const fetchOptions = isServer
    ? { headers: composeWorkingHeaders() }
    : undefined;

  const client = createClient({
    url,
    fetchOptions,
    exchanges: exchanges.filter((x): x is Exchange => !!x),
    suspense: withSsrExchange,
  });

  return withSsrExchange ? [client, ssr] : client;
}
