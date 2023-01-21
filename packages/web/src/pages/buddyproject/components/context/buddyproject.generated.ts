import * as Types from '../../../../__generated__/types';

import { gql } from 'urql';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type StateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StateQuery = { __typename?: 'Query', getBuddyProjectStatus: { __typename?: 'BuddyProjectStatusPayload', buddy: Buddy | null, status: Types.BuddyProjectStatus } };

export type Buddy = { __typename?: 'BuddyProjectEntry', userId: string, username?: string | null };

export type SignUpMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type SignUpMutation = { __typename?: 'Mutation', buddyProjectSignUp: { __typename?: 'WebSignUpResult', result: Types.SignUpResult, status: { __typename?: 'BuddyProjectStatusPayload', status: Types.BuddyProjectStatus } } };



export const StateDocument = gql`
    query State {
  getBuddyProjectStatus {
    buddy @export(exportName: "Buddy") {
      userId
      username
    }
    status
  }
}
    `;

export function useStateQuery(options?: Omit<Urql.UseQueryArgs<StateQueryVariables>, 'query'>) {
  return Urql.useQuery<StateQuery, StateQueryVariables>({ query: StateDocument, ...options });
};
export const SignUpDocument = gql`
    mutation SignUp {
  buddyProjectSignUp {
    result
    status {
      status
    }
  }
}
    `;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};