import { GraphQLClient } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/cjs/types";
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
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
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

export type TypesenseApiKeyQueryVariables = Exact<{ [key: string]: never }>;

export type TypesenseApiKeyQuery = {
  __typename?: "Query";
  groupchatSearchToken: string;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: "Query";
  me?: {
    __typename: "AuthenticatedUser";
    id: string;
    username: string;
    avatarUrl?: string | null;
    isOnServer: boolean;
  } | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

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
export const TypesenseApiKeyDocument = gql`
  query TypesenseApiKey {
    groupchatSearchToken
  }
`;
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
export const LogoutDocument = gql`
  mutation Logout {
    logout
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
      requestHeaders?: GraphQLClientRequestHeaders
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
      requestHeaders?: GraphQLClientRequestHeaders
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
      requestHeaders?: GraphQLClientRequestHeaders
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
    TypesenseApiKey(
      variables?: TypesenseApiKeyQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<TypesenseApiKeyQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TypesenseApiKeyQuery>(
            TypesenseApiKeyDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "TypesenseApiKey",
        "query"
      );
    },
    CurrentUser(
      variables?: CurrentUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
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
    Logout(
      variables?: LogoutMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
