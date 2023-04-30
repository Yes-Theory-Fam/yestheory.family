import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

export type BuddyProjectStatus = "MATCHED" | "NOT_SIGNED_UP" | "SIGNED_UP";

export type SignUpResult = "FAILURE" | "FULL_SUCCESS" | "SUCCESS_DMS_CLOSED";

export type ServerStateQueryVariables = Exact<{ [key: string]: never }>;

export type ServerStateQuery = {
  __typename?: "Query";
  me?: { __typename?: "AuthenticatedUser"; isOnServer: boolean } | null;
};

export type BuddyProjectStateQueryVariables = Exact<{ [key: string]: never }>;

export type BuddyProjectStateQuery = {
  __typename?: "Query";
  getBuddyProjectStatus: {
    __typename?: "BuddyProjectStatusPayload";
    status: BuddyProjectStatus;
    buddy?: {
      __typename?: "BuddyProjectEntry";
      userId: string;
      username?: string | null;
    } | null;
  };
};

export type BuddyProjectSignUpMutationVariables = Exact<{
  [key: string]: never;
}>;

export type BuddyProjectSignUpMutation = {
  __typename?: "Mutation";
  buddyProjectSignUp: {
    __typename?: "WebSignUpResult";
    result: SignUpResult;
    status: {
      __typename?: "BuddyProjectStatusPayload";
      status: BuddyProjectStatus;
    };
  };
};

export type AuthPocQueryVariables = Exact<{ [key: string]: never }>;

export type AuthPocQuery = {
  __typename?: "Query";
  me?: { __typename?: "AuthenticatedUser"; username: string } | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "AuthenticatedUser";
    id: string;
    username: string;
    avatarUrl?: string | null;
  } | null;
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
export const AuthPocDocument = gql`
  query AuthPoc {
    me {
      username
    }
  }
`;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export const CurrentUserDocument = gql`
  query CurrentUser {
    me @export(exportName: "User") {
      id
      username
      avatarUrl
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    ServerState(
      variables?: ServerStateQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<ServerStateQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ServerStateQuery>(ServerStateDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "ServerState",
        "query"
      );
    },
    BuddyProjectState(
      variables?: BuddyProjectStateQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<BuddyProjectStateQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BuddyProjectStateQuery>(
            BuddyProjectStateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "BuddyProjectState",
        "query"
      );
    },
    BuddyProjectSignUp(
      variables?: BuddyProjectSignUpMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<BuddyProjectSignUpMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BuddyProjectSignUpMutation>(
            BuddyProjectSignUpDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "BuddyProjectSignUp",
        "mutation"
      );
    },
    AuthPoc(
      variables?: AuthPocQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AuthPocQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AuthPocQuery>(AuthPocDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "AuthPoc",
        "query"
      );
    },
    Logout(
      variables?: LogoutMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<LogoutMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LogoutMutation>(LogoutDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Logout",
        "mutation"
      );
    },
    CurrentUser(
      variables?: CurrentUserQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<CurrentUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CurrentUserQuery>(CurrentUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "CurrentUser",
        "query"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
