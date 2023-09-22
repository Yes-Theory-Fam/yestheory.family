import { registerUrql } from "@urql/next/rsc";
import { getScopedUrqlClient } from "./get-scoped-urql-client";

const makeClient = () => {
  return getScopedUrqlClient(false);
};

export const { getClient: getUrqlClient } = registerUrql(makeClient);

export * from "../../__generated__/graphql";
