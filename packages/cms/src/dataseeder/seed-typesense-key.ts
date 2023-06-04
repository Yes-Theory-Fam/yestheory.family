import { typesenseClient } from "../lib/typesense";

const apiKey = "yestheory-family-typesense-search-key";

export const seedTypesenseKey = async () => {
  await typesenseClient.keys().create({
    collections: ["*"],
    actions: ["documents:search"],
    value: apiKey,
    description: "Default global search key",
  });
};
