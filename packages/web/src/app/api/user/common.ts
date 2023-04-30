import { headers } from "next/headers";
import { graphqlWithHeaders } from "../../../lib/graphql";

export const getCurrentUser = async (requestHeaders?: Headers) => {
  const usedHeaders = requestHeaders ?? headers();

  const [data] = await graphqlWithHeaders(usedHeaders, (sdk) =>
    sdk.CurrentUser()
  );

  return data.me;
};
