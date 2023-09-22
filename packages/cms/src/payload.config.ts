import { buildConfig, Config } from "payload/config";
import path from "path";
import { Users } from "./collections/users";
import { Groupchats } from "./collections/groupchats";
import { mergeQueries } from "./utils/merge-queries";
import { searchTokenByAuthenticatedQuery } from "./graphql/queries/search-token-by-authenticated";

const config: Config = {
  admin: {
    user: Users.slug,
    buildPath: path.resolve(__dirname, "../build"),
  },
  collections: [Users, Groupchats],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    queries: mergeQueries({
      searchTokenByAuthenticated: searchTokenByAuthenticatedQuery,
    }),
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
};

export default buildConfig(config);
