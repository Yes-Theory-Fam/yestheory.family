import { GraphQLClient } from "graphql-request";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import util from "node:util";
import { getSdk, Sdk } from "../__generated__/graphql";

type ReadonlyHeaders = ReturnType<typeof headers>;

export const getGraphqlClient = (
  requestHeaders: ReadonlyHeaders,
  responseHeaders: Headers
) => {
  if (!process.env.SERVER_BACKEND_GRAPHQL_URL) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Missing SERVER_BACKEND_GRAPHQL_URL");
    }

    notFound();
  }

  const headers = Object.fromEntries(requestHeaders.entries());

  const client = new GraphQLClient(process.env.SERVER_BACKEND_GRAPHQL_URL, {
    headers,
    responseMiddleware: (response) => {
      if (response instanceof Error) throw response;

      // We skip the Content-Length header because the response might be modified later, resulting in a shorter or longer response
      response.headers.forEach((v, k) => {
        if (k.toLowerCase() === "content-length") return;

        responseHeaders.append(k, v);
      });
    },
    requestMiddleware:
      process.env.GRAPHQL_DEBUG === "true"
        ? (req) => {
            console.info(
              "GraphQL:",
              util.inspect(JSON.parse(req.body as string), {
                showHidden: false,
                depth: null,
                colors: true,
              }),
              util.inspect(JSON.stringify(requestHeaders, null, 4))
            );
            return req;
          }
        : undefined,
  });

  return getSdk(client);
};

export const graphqlWithHeaders = async <T>(
  headers: ReadonlyHeaders,
  cb: (sdk: Sdk) => Promise<T>
): Promise<[T, Headers]> => {
  const responseHeaders: Headers = new Headers();
  const client = getGraphqlClient(headers, responseHeaders);

  return [await cb(client), responseHeaders];
};

export * from "../__generated__/graphql";
