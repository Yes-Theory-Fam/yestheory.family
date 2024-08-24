import path from 'path';
import {fileURLToPath} from 'url';
import {postgresAdapter} from '@payloadcms/db-postgres';
import {slateEditor} from '@payloadcms/richtext-slate';
import {PHASE_PRODUCTION_BUILD} from 'next/constants';
import {buildConfig, type Config} from 'payload';
import sharp from 'sharp';
import {Features} from './app/(payload)/collections/features';
import {GroupchatKeywords} from './app/(payload)/collections/groupchat-keywords';
import {Groupchats} from './app/(payload)/collections/groupchats';
import {Media} from './app/(payload)/collections/media';
import {Users} from './app/(payload)/collections/users';
import {setupCronJobs} from './app/(payload)/cron-jobs';
import {mimicUserOperationMutation} from './app/(payload)/graphql/mutations/mimic-user-operation';
import {groupchatSearchTokenQuery} from './app/(payload)/graphql/queries/groupchat-search-token';
import {mayOperateQuery} from './app/(payload)/graphql/queries/may-operate';
import {mergeQueries} from './app/(payload)/utils/merge-queries';
import {migrations} from './migrations';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config: Config = {
  admin: {
    importMap: {
      baseDir: path.resolve(dirname, '../app/(payload)'),
    },
    user: Users.slug,
    components: {
      afterLogin: [
        {
          path: '/components/after-login/after-login',
          exportName: 'AfterLogin',
        },
      ],
    },
  },
  onInit: async (payload) => {
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) return;
    void setupCronJobs(payload);
  },
  editor: slateEditor({}),
  collections: [Users, Media, Groupchats, GroupchatKeywords, Features],
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, 'migrations'),
    pool: {connectionString: process.env.DATABASE_URI},
    prodMigrations: migrations,
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
