import { createContext, FunctionalComponent, Context, VNode } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";
import { useCurrentUserQuery, User } from "./user.generated";

interface UserContextProps {
  readonly loggedIn: boolean;
  user: User | undefined;
  clearUser: () => void;
}

const UserContext: Context<UserContextProps> = createContext<UserContextProps>({
  get loggedIn() {
    return false;
  },
  user: undefined,
  clearUser: () => {},
});

interface UserProviderProps {
  children: VNode;
  serverAuthenticated: boolean;
}

const emptyUser: User = {
  username: "",
  id: "",
  __typename: "AuthenticatedUser",
  avatarUrl: "",
};

export const UserProvider: FunctionalComponent<UserProviderProps> = ({
  serverAuthenticated,
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(
    serverAuthenticated ? emptyUser : undefined
  );

  const loggedIn = !!user;
  const [{ data }] = useCurrentUserQuery();

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    }
  }, [data]);

  return (
    <UserContext.Provider
      value={{ loggedIn, user, clearUser: () => setUser(undefined) }}
    >
      {children}
    </UserContext.Provider>
  );
};

interface UserConsumerProps {
  children: (context: UserContextProps) => VNode;
}

export const UserConsumer: FunctionalComponent<UserConsumerProps> = ({
  children,
}) => <UserContext.Consumer>{children}</UserContext.Consumer>;

export const useUser = (): User | undefined => {
  const context = useContext(UserContext);
  return context.user;
};

export const useLoggedIn = (): boolean => {
  const context = useContext(UserContext);
  return context.loggedIn;
};

export const navigateToLogin = (): void => {
  const lastLocation = window.location.href;
  const domain = window.location.hostname;
  document.cookie = `last_location=${lastLocation};domain=${domain};path=/`;
  window.location.href = "http://localhost:5000/oauth/discord";
};
