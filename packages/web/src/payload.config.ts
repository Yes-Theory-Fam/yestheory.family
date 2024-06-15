import path from 'path';
import {fileURLToPath} from 'url';
import {postgresAdapter} from '@payloadcms/db-postgres';
import {slateEditor} from '@payloadcms/richtext-slate';
import {buildConfig, type Config} from 'payload/config';
import sharp from 'sharp';
import {Features} from './app/(payload)/collections/features';
import {GroupchatKeywords} from './app/(payload)/collections/groupchat-keywords';
import {Groupchats} from './app/(payload)/collections/groupchats';
import {Media} from './app/(payload)/collections/media';
import {Users} from './app/(payload)/collections/users';
import {AfterLogin} from './app/(payload)/components/after-login/after-login';
import {setupGroupchatSync} from './app/(payload)/cron-jobs/groupchat-sync';
import {mimicUserOperationMutation} from './app/(payload)/graphql/mutations/mimic-user-operation';
import {groupchatSearchTokenQuery} from './app/(payload)/graphql/queries/groupchat-search-token';
import {mayOperateQuery} from './app/(payload)/graphql/queries/may-operate';
import {ensureDbExists} from './app/(payload)/utils/ensure-db-exists';
import {mergeQueries} from './app/(payload)/utils/merge-queries';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

await ensureDbExists();

const config: Config = {
  admin: {
    user: Users.slug,
    components: {
      afterLogin: [AfterLogin],
    },
  },
  onInit: async (payload) => {
    // TODO wait for drizzle to resolve this and run migrations prior to JS container
    //   https://github.com/drizzle-team/drizzle-orm/issues/819
    // await payload.db.migrate();
    void setupGroupchatSync(payload);
  },
  editor: slateEditor({}),
  collections: [Users, Media, Groupchats, GroupchatKeywords, Features],
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, 'migrations'),
    pool: {connectionString: process.env.DATABASE_URI},
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET || '',
  graphQL: {
    queries: mergeQueries<unknown, never>({
      groupchatSearchToken: groupchatSearchTokenQuery,
      mayOperate: mayOperateQuery,
    }),
    mutations: mergeQueries<unknown, never>({
      mimicUserOperation: mimicUserOperationMutation,
    }),
  },
  serverURL: process.env.FRONTEND_URL,
  sharp,
};

export default buildConfig(config);
