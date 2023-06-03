import { buildConfig } from "payload/config";
import path from "path";
import { Users } from "./collections/users";
import { Groupchats } from "./collections/groupchats";

export default buildConfig({
  serverURL: process.env.SERVER_URL ?? "http://localhost:3001",
  admin: {
    user: Users.slug,
    buildPath: path.resolve(__dirname, "../build"),
  },
  collections: [Users, Groupchats],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
