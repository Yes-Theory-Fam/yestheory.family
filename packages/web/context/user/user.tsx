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
  clearUser: () => {
    /* no-op */
  },
});

interface UserProviderProps {
  children: VNode;
  serverUser: User;
}

export const UserProvider: FunctionalComponent<UserProviderProps> = ({
  serverUser,
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(serverUser ?? undefined);

  const loggedIn = !!user;
  const [{ data }] = useCurrentUserQuery({ pause: !loggedIn });

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    }
  }, [data]);

  useEffect(() => {
    if (!serverUser) {
      setUser(undefined);
      return;
    }
  }, [serverUser]);

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
