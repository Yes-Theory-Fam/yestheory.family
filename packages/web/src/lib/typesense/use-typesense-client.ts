import { useTypesenseApiKeyQuery } from "./typesense.client.generated";
import { useMemo } from "react";
import { getTypesenseClient } from "./client";

export const useTypesenseClient = () => {
  const [{ data }] = useTypesenseApiKeyQuery();
  const apiKey = data?.groupchatSearchToken ?? "";

  return useMemo(() => getTypesenseClient(apiKey), [apiKey]);
};
