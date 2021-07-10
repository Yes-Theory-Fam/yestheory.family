import { createContext, FunctionalComponent, Context, VNode } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";
import { useCurrentUserQuery, User } from "./user.generated";

interface UserContextProps {
  readonly loggedIn: boolean;
  user: User | undefined;
}

// const getIsLoggedIn = () =>
//   document.cookie.split(";").some((c) => c.trim().startsWith(cookieName));

const UserContext: Context<UserContextProps> = createContext<UserContextProps>({
  get loggedIn() {
    return false;
  },
  user: undefined,
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
    <UserContext.Provider value={{ loggedIn, user }}>
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
