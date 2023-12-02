import { buildConfig, Config } from "payload/config";
import path from "path";
import { viteBundler } from "@payloadcms/bundler-vite";
import { slateEditor } from "@payloadcms/richtext-slate";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { Users } from "./collections/users";
import { Groupchats } from "./collections/groupchats";
import { mergeQueries } from "./utils/merge-queries";
import { searchTokenByAuthenticatedQuery } from "./graphql/queries/search-token-by-authenticated";

const config: Config = {
  admin: {
    user: Users.slug,
    buildPath: path.resolve(__dirname, "../build"),
    bundler: viteBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Groupchats],
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } }),
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
