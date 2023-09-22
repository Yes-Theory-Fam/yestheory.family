import * as Types from "../../__generated__/graphql";

import { gql } from "@urql/next";
import * as Urql from "@urql/next";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: "Query"; me: User | null };

export type User = {
  __typename: "AuthenticatedUser";
  id: string;
  username: string;
  avatarUrl?: string | null;
  isOnServer: boolean;
};

export type LogoutMutationVariables = Types.Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export const CurrentUserDocument = gql`
  query CurrentUser {
    me @export(exportName: "User") {
      __typename
      id
      username
      avatarUrl
      isOnServer
    }
  }
`;

export function useCurrentUserQuery(
  options?: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, "query">
) {
  return Urql.useQuery<CurrentUserQuery, CurrentUserQueryVariables>({
    query: CurrentUserDocument,
    ...options,
  });
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
