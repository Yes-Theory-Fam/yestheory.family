import { GraphQLClient } from "graphql-request";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import util from "node:util";
import { getSdk, Sdk } from "../../__generated__/graphql";

export const getGraphqlClient = () => {
  const requestHeaders = headers();

  if (!process.env.SERVER_BACKEND_GRAPHQL_URL) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Missing SERVER_BACKEND_GRAPHQL_URL");
    }

    notFound();
  }

  const client = new GraphQLClient(process.env.SERVER_BACKEND_GRAPHQL_URL, {
    headers: {
      Cookie: requestHeaders.get("Cookie") ?? "",
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
  cb: (sdk: Sdk) => Promise<T>
): Promise<T> => {
  const client = getGraphqlClient();

  return await cb(client);
};

export * from "../../__generated__/graphql";
