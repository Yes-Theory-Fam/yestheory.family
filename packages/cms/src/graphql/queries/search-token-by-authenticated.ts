import { QueryFactory } from "../../utils/merge-queries";
import { typesenseClient } from "../../lib/typesense";
import { apiKey } from "../../dataseeder/seed-typesense-key";
import { GeneratedTypes } from "payload";

type GroupchatPlatform =
  GeneratedTypes["collections"]["groupchats"]["platform"];

export const searchTokenByAuthenticatedQuery: QueryFactory<
  string,
  { isAuthenticated: boolean }
> = (GraphQL, payload) => ({
  type: GraphQL.GraphQLString,
  args: { isAuthenticated: { type: GraphQL.GraphQLBoolean } },
  resolve: async (_: unknown, { isAuthenticated }) => {
    const accessiblePlatforms: GroupchatPlatform[] = ["facebook"];

    if (isAuthenticated) {
      accessiblePlatforms.push("discord", "signal", "telegram", "whatsapp");
    }

    const filterBy = `platform:=[${accessiblePlatforms.join(",")}]`;

    return typesenseClient
      .keys()
      .generateScopedSearchKey(apiKey, { filter_by: filterBy });
  },
});
