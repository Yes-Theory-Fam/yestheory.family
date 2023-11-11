import { createContext, FC, PropsWithChildren, useMemo } from "react";
import { CurrentUserQuery } from "../../__generated__/graphql";

export type User = Exclude<CurrentUserQuery["me"], null>;

export type UserContextData = {
  user: User | null;
  isLoggedIn: boolean;
};

export const UserContext = createContext<UserContextData | null>(null);

export type UserProviderProps = PropsWithChildren<{
  user: User | null;
}>;

export const UserProvider: FC<UserProviderProps> = ({ user, children }) => {
  const value = useMemo(() => ({ user, isLoggedIn: !!user }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
