import * as Types from "../../__generated__/types";

import { gql } from "urql";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ServerStateQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ServerStateQuery = {
  __typename?: "Query";
  me?: { __typename?: "AuthenticatedUser"; isOnServer: boolean } | null;
};

export const ServerStateDocument = gql`
  query ServerState {
    me {
      isOnServer
    }
  }
`;

export function useServerStateQuery(
  options: Omit<Urql.UseQueryArgs<ServerStateQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ServerStateQuery>({
    query: ServerStateDocument,
    ...options,
  });
}
