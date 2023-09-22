"use client";

import NiceModal from "@ebay/nice-modal-react";
import { FC, PropsWithChildren } from "react";
import { UserProvider } from "../context/user/user";
import { ScrollbarWidthProvider } from "../components/scrollbar-width-provider";
import { UrqlProvider } from "../lib/urql/context";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NiceModal.Provider>
      <UrqlProvider>
        <ScrollbarWidthProvider />
        <UserProvider>{children}</UserProvider>
      </UrqlProvider>
    </NiceModal.Provider>
  );
};
