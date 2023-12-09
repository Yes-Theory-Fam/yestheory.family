import path from 'path';
import {viteBundler} from '@payloadcms/bundler-vite';
import {postgresAdapter} from '@payloadcms/db-postgres';
import {slateEditor} from '@payloadcms/richtext-slate';
import {buildConfig, type Config} from 'payload/config';
import {Groupchats} from './collections/groupchats';
import {Users} from './collections/users';
import {searchTokenByAuthenticatedQuery} from './graphql/queries/search-token-by-authenticated';
import {mergeQueries} from './utils/merge-queries';

const config: Config = {
  admin: {
    user: Users.slug,
    buildPath: path.resolve(__dirname, '../build'),
    bundler: viteBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Groupchats],
  db: postgresAdapter({
    migrationDir: path.resolve(__dirname, 'migrations'),
    pool: {connectionString: process.env.DATABASE_URI},
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    queries: mergeQueries({
      searchTokenByAuthenticated: searchTokenByAuthenticatedQuery,
    }),
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
};

export default buildConfig(config);
