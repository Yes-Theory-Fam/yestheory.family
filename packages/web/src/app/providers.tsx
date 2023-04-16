"use client";

import NiceModal from "@ebay/nice-modal-react";
import { FC, PropsWithChildren } from "react";
import { UserProvider, User } from "../context/user/user";

interface ProviderProps {
  initialUser: User | undefined;
}

export const Providers: FC<PropsWithChildren<ProviderProps>> = ({
  children,
  initialUser,
}) => {
  return (
    <NiceModal.Provider>
      <UserProvider initialUser={initialUser}>{children}</UserProvider>
    </NiceModal.Provider>
  );
};
