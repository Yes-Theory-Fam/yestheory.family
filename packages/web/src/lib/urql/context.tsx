import { FC, PropsWithChildren, Suspense, useMemo } from "react";
import { UrqlProvider as OrigUrqlProvider } from "@urql/next";
import { getScopedUrqlClient } from "./get-scoped-urql-client";

export const UrqlProvider: FC<PropsWithChildren> = ({ children }) => {
  const [client, ssr] = useMemo(() => getScopedUrqlClient(true), []);

  return (
    <Suspense>
      <OrigUrqlProvider client={client} ssr={ssr}>
        {children}
      </OrigUrqlProvider>
    </Suspense>
  );
};
