"use client";

import NiceModal from "@ebay/nice-modal-react";
import { FC, PropsWithChildren } from "react";
import { UserProvider, User } from "../context/user/user";
import { ScrollbarWidthProvider } from "../components/scrollbar-width-provider";

interface ProviderProps {
  initialUser: User | undefined;
}

export const Providers: FC<PropsWithChildren<ProviderProps>> = ({
  children,
  initialUser,
}) => {
  return (
    <NiceModal.Provider>
      <ScrollbarWidthProvider />
      <UserProvider initialUser={initialUser}>{children}</UserProvider>
    </NiceModal.Provider>
  );
};
