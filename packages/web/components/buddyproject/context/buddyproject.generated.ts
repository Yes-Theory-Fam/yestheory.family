import * as Types from "../../../__generated__/types";

import { gql } from "urql";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type StateQueryVariables = Types.Exact<{ [key: string]: never }>;

export type StateQuery = {
  __typename?: "Query";
  getBuddyProjectStatus: {
    __typename?: "BuddyProjectStatusPayload";
    status: Types.BuddyProjectStatus;
    buddy: Buddy | null;
  };
};

export type Buddy = { __typename?: "BuddyProjectEntry"; userId: string };

export type SignUpMutationVariables = Types.Exact<{ [key: string]: never }>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "BuddyProjectStatusPayload";
    status: Types.BuddyProjectStatus;
  };
};

export const StateDocument = gql`
  query State {
    getBuddyProjectStatus {
      buddy @export(exportName: "Buddy") {
        userId
      }
      status
    }
  }
`;

export function useStateQuery(
  options: Omit<Urql.UseQueryArgs<StateQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<StateQuery>({ query: StateDocument, ...options });
}
export const SignUpDocument = gql`
  mutation SignUp @withDiscord {
    signUp {
      status
    }
  }
`;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument
  );
}
