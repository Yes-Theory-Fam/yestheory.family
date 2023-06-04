import { SearchClient } from "typesense";
import { NodeConfiguration } from "typesense/lib/Typesense/Configuration";

let instance: SearchClient | null = null;

const apiKey = "yestheory-family-typesense-search-key";

export const getTypesenseClient = () => {
  if (instance) return instance;

  const isServer = typeof window === "undefined";

  let node: NodeConfiguration;

  if (isServer) {
    const directUrl = new URL(
      process.env.TYPESENSE_DIRECT_URL ?? "http://localhost:8108"
    );
    const protocol = directUrl.protocol;
    node = {
      host: directUrl.hostname,
      port: Number(directUrl.port),
      protocol: protocol.substring(0, protocol.length - 1),
    };
  } else {
    const protocol = window.location.protocol;
    node = {
      host: window.location.hostname,
      port: Number(window.location.port),
      protocol: protocol.substring(0, protocol.length - 1),
      path: "/typesense",
    };
  }

  instance = new SearchClient({
    apiKey,
    nodes: [node],
  });

  return instance;
};
