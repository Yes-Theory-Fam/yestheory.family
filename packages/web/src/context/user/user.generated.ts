import * as Types from '../../__generated__/types';

import { gql } from 'urql';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: User | null };

export type User = { __typename?: 'AuthenticatedUser', id: string, username: string, avatarUrl: string };


export const CurrentUserDocument = gql`
    query CurrentUser {
  me @export(exportName: "User") {
    id
    username
    avatarUrl
  }
}
    `;

export function useCurrentUserQuery(options?: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentUserQuery, CurrentUserQueryVariables>({ query: CurrentUserDocument, ...options });
};