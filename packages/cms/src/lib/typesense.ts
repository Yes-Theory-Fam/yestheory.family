import { Client } from "typesense";

export const typesenseClient = new Client({
  nodes: [
    {
      host: "localhost",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: "1234567890",
  connectionTimeoutSeconds: 2,
});
