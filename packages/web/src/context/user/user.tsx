"use client";

import { FC, ReactNode, createContext, useContext, useMemo } from "react";
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from "./user.client.generated";

export interface User {
  id: string;
  username: string;
  avatarUrl?: string | null | undefined;
}

interface UserContextProps {
  readonly loggedIn: boolean;
  user: User | undefined;
  refetch: () => void;

  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [{ data }, refetch] = useCurrentUserQuery();
  const [, logout] = useLogoutMutation();

  console.log(data);

  const user = data?.me ?? undefined;
  const loggedIn = !!user;

  const value = useMemo(() => {
    const logoutAndRefetch = () =>
      logout({}).then(() => window.location.reload());

    return { loggedIn, user, refetch, logout: logoutAndRefetch };
  }, [loggedIn, user, refetch, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Using UserContext outside of a valid provider");
  }

  return context;
};

export const navigateToLogin = (): void => {
  const lastLocation = window.location.href;
  const domain = window.location.hostname;
  document.cookie = `last_location=${lastLocation};domain=${domain};path=/`;
  window.location.href = "/oauth/discord";
};
