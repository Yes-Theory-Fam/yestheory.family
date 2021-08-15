import { AuthConfig, authExchange } from "@urql/exchange-auth";
import {
  RefreshTokenDocument,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from "./refresh-token.generated";
import { navigateToLogin } from "../../context/user/user";
import { Operation } from "urql";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

const isOperationWithDiscordAuth = (
  operation: Operation<unknown, unknown>
): boolean => {
  const indicatorDirective = "withDiscord";
  return operation.query.definitions.some(
    (def) =>
      def.kind === "DirectiveDefinition" &&
      def.name.value === indicatorDirective
  );
};

const addAuthToOperation: AuthConfig<AuthState>["addAuthToOperation"] = ({
  authState,
  operation,
}) => {
  if (
    !authState ||
    !authState.accessToken ||
    !isOperationWithDiscordAuth(operation)
  ) {
    return operation;
  }

  // fetchOptions can be a function (See Client API) but you can simplify this based on usage
  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return {
    ...operation,
    context: {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authState.accessToken}`,
        },
      },
    },
  };
};

// We are not interested in authorization errors!
const didAuthError: AuthConfig<AuthState>["didAuthError"] = ({ error }) => {
  return error.graphQLErrors.some(
    (e) => e.extensions.code === "UNAUTHENTICATED"
  );
};

const willAuthError: AuthConfig<AuthState>["willAuthError"] = ({
  authState,
  operation,
}) => {
  if (!isOperationWithDiscordAuth(operation)) return false;

  if (!authState) return true;

  // We already allow refreshing in the 20 minutes before the token expires if possible
  const margin = 20 * 60 * 1000;
  return Date.now() > authState.expiresAt - margin;
};

const getAuth: AuthConfig<AuthState>["getAuth"] = async ({
  authState,
  mutate,
}) => {
  // If no authState is present in the exchange, try to recover it from localStorage
  // If we cannot recover the expiry date, we don't have auth information :c
  if (!authState) {
    const expiresAtString = localStorage.getItem("expiresAt");
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    const expiresAt = Number(expiresAtString);

    if (!expiresAtString) {
      navigateToLogin();
      return null;
    }

    return {
      accessToken,
      refreshToken,
      expiresAt,
    };
  }

  const { expiresAt, refreshToken } = authState;

  // Token expired :c But we have a refreshToken :)
  if (Date.now() > expiresAt && refreshToken) {
    const refreshResult = await mutate<
      RefreshTokenMutation,
      RefreshTokenMutationVariables
    >(RefreshTokenDocument, { refreshToken });

    const authData = refreshResult.data?.refreshToken;
    if (!authData) {
      navigateToLogin();
      return null;
    }

    return authData;
  }

  return authState;
};

export const configuredAuthExchange = authExchange({
  addAuthToOperation,
  getAuth,
  didAuthError,
  willAuthError,
});
