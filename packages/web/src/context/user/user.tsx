import {
  FC,
  ReactNode,
  Context,
  createContext,
  useContext,
  useCallback,
} from "react";
import { useCurrentUserQuery, User } from "./user.generated";

interface UserContextProps {
  readonly loggedIn: boolean;
  user: User | undefined;
  refetch: () => void;
}

const UserContext: Context<UserContextProps> = createContext<UserContextProps>({
  get loggedIn() {
    return false;
  },
  user: undefined,
  refetch: () => {
    /* no-op */
  },
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [{ data }, refetch] = useCurrentUserQuery();
  const loggedIn = !!data?.me;

  const cachelessRefetch = useCallback(
    () => refetch({ requestPolicy: "network-only" }),
    [refetch]
  );

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        user: data?.me ?? undefined,
        refetch: cachelessRefetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

interface UserConsumerProps {
  children: (context: UserContextProps) => ReactNode;
}

export const UserConsumer: FC<UserConsumerProps> = ({ children }) => (
  <UserContext.Consumer>{children}</UserContext.Consumer>
);

export const useLoggedIn = (): boolean => {
  const context = useContext(UserContext);
  return context.loggedIn;
};

export const navigateToLogin = (): void => {
  const lastLocation = window.location.href;
  const domain = window.location.hostname;
  document.cookie = `last_location=${lastLocation};domain=${domain};path=/`;
  window.location.href = "/oauth/discord";
};
