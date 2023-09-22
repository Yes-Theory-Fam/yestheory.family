import * as Types from "../../__generated__/graphql";

import { gql } from "@urql/next";
import * as Urql from "@urql/next";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type BuddyProjectSignUpMutationVariables = Types.Exact<{
  [key: string]: never;
}>;

export type BuddyProjectSignUpMutation = {
  __typename?: "Mutation";
  buddyProjectSignUp: {
    __typename?: "WebSignUpResult";
    result: Types.SignUpResult;
    status: {
      __typename?: "BuddyProjectStatusPayload";
      status: Types.BuddyProjectStatus;
    };
  };
};

export const BuddyProjectSignUpDocument = gql`
  mutation BuddyProjectSignUp {
    buddyProjectSignUp {
      result
      status {
        status
      }
    }
  }
`;

export function useBuddyProjectSignUpMutation() {
  return Urql.useMutation<
    BuddyProjectSignUpMutation,
    BuddyProjectSignUpMutationVariables
  >(BuddyProjectSignUpDocument);
}
