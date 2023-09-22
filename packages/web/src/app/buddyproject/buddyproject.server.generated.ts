import * as Types from "../../__generated__/graphql";

import { gql } from "@urql/core";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ServerStateQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ServerStateQuery = {
  __typename?: "Query";
  me?: { __typename?: "AuthenticatedUser"; isOnServer: boolean } | null;
};

export type BuddyProjectStateQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type BuddyProjectStateQuery = {
  __typename?: "Query";
  getBuddyProjectStatus: {
    __typename?: "BuddyProjectStatusPayload";
    status: Types.BuddyProjectStatus;
    buddy?: {
      __typename?: "BuddyProjectEntry";
      userId: string;
      username?: string | null;
    } | null;
  };
};

export const ServerStateDocument = gql`
  query ServerState {
    me {
      isOnServer
    }
  }
`;
export const BuddyProjectStateDocument = gql`
  query BuddyProjectState {
    getBuddyProjectStatus {
      buddy {
        userId
        username
      }
      status
    }
  }
`;
