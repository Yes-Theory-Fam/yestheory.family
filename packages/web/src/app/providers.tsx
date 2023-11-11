"use client";

import NiceModal from "@ebay/nice-modal-react";
import { FC, PropsWithChildren } from "react";
import { ScrollbarWidthProvider } from "../components/scrollbar-width-provider";
import { User, UserProvider } from "../context/user/user-context";

export type ProvidersProps = PropsWithChildren<{
  user: User | null;
}>;

export const Providers: FC<ProvidersProps> = ({ user, children }) => {
  return (
    <NiceModal.Provider>
      <ScrollbarWidthProvider />
      <UserProvider user={user}>{children}</UserProvider>
    </NiceModal.Provider>
  );
};
