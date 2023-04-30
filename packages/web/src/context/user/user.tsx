"use client";

import { useRouter } from "next/navigation";
import { FC, ReactNode, createContext, useContext, useState } from "react";

export interface User {
  id: string;
  username: string;
  avatarUrl?: string | null | undefined;
}

interface UserContextProps {
  readonly loggedIn: boolean;
  user: User | undefined;
  refetch: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
  children: ReactNode;
  initialUser: User | undefined;
}

const refetchUser = async () => {
  const response = await fetch("/api/user");

  const newVar = await response.json();

  return newVar as User;
};

export const UserProvider: FC<UserProviderProps> = ({
  children,
  initialUser,
}) => {
  const [user, setUser] = useState<User | undefined>(initialUser);
  const router = useRouter();

  const refetch = () =>
    refetchUser()
      .then(setUser)
      .then(() => router.refresh());

  const loggedIn = !!user;

  return (
    <UserContext.Provider value={{ loggedIn, user, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Using UserContext outside of a valid provider");
  }

  return context;
};

export const useLoggedIn = (): boolean => {
  const context = useAuth();

  return context.loggedIn;
};

export const navigateToLogin = (): void => {
  const lastLocation = window.location.href;
  const domain = window.location.hostname;
  document.cookie = `last_location=${lastLocation};domain=${domain};path=/`;
  window.location.href = "/oauth/discord";
};
