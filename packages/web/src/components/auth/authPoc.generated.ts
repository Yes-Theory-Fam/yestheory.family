import * as Types from "../../__generated__/types";

import { gql } from "urql";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type AuthPocQueryVariables = Types.Exact<{ [key: string]: never }>;

export type AuthPocQuery = {
  __typename?: "Query";
  me?: { __typename?: "AuthenticatedUser"; username: string } | null;
};

export const AuthPocDocument = gql`
  query AuthPoc {
    me {
      username
    }
  }
`;

export function useAuthPocQuery(
  options?: Omit<Urql.UseQueryArgs<AuthPocQueryVariables>, "query">
) {
  return Urql.useQuery<AuthPocQuery, AuthPocQueryVariables>({
    query: AuthPocDocument,
    ...options,
  });
}
