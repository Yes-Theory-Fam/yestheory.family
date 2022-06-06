import * as Types from "../../__generated__/types";

import { gql } from "urql";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type RefreshTokenMutationVariables = Types.Exact<{
  refreshToken: string;
}>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken: {
    __typename?: "RefreshTokenPayload";
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
  };
};

export const RefreshTokenDocument = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      expiresAt
      refreshToken
    }
  }
`;

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(
    RefreshTokenDocument
  );
}
