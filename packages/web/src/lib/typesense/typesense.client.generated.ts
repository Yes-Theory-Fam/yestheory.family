import * as Types from "../../__generated__/graphql";

import { gql } from "@urql/next";
import * as Urql from "@urql/next";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type TypesenseApiKeyQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type TypesenseApiKeyQuery = {
  __typename?: "Query";
  groupchatSearchToken: string;
};

export const TypesenseApiKeyDocument = gql`
  query TypesenseApiKey {
    groupchatSearchToken
  }
`;

export function useTypesenseApiKeyQuery(
  options?: Omit<Urql.UseQueryArgs<TypesenseApiKeyQueryVariables>, "query">
) {
  return Urql.useQuery<TypesenseApiKeyQuery, TypesenseApiKeyQueryVariables>({
    query: TypesenseApiKeyDocument,
    ...options,
  });
}
