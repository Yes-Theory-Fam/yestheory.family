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
    const port =
      Number(directUrl.port) || (directUrl.protocol === "http" ? 80 : 443);

    node = {
      host: directUrl.hostname,
      port,
      protocol: protocol.substring(0, protocol.length - 1),
    };
  } else {
    const protocol = window.location.protocol;
    const port =
      Number(window.location.port) ||
      (window.location.protocol === "http" ? 80 : 443);

    node = {
      host: window.location.hostname,
      port: port,
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
