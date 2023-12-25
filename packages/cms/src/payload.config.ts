import path from 'path';
import {viteBundler} from '@payloadcms/bundler-vite';
import {postgresAdapter} from '@payloadcms/db-postgres';
import {slateEditor} from '@payloadcms/richtext-slate';
import {buildConfig, type Config} from 'payload/config';
import {GroupchatKeywords} from './collections/groupchat-keywords';
import {Groupchats} from './collections/groupchats';
import {Users} from './collections/users';
import {AfterLogin} from './components/after-login/after-login';
import {mimicUserOperationMutation} from './graphql/mutations/mimic-user-operation';
import {groupchatSearchTokenQuery} from './graphql/queries/groupchat-search-token';
import {mayOperateQuery} from './graphql/queries/may-operate';
import {externals} from './plugins/externals';
import {safeAsyncEndpoints} from './plugins/safe-async-endpoints';
import {tailwind} from './plugins/tailwind';
import {mergeQueries} from './utils/merge-queries';

const config: Config = {
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, './styles/tailwind.css'),
    buildPath: path.resolve(__dirname, '../build'),
    bundler: viteBundler(),
    components: {
      afterLogin: [AfterLogin],
    },
  },
  editor: slateEditor({}),
  collections: [Users, Groupchats, GroupchatKeywords],
  db: postgresAdapter({
    migrationDir: path.resolve(__dirname, 'migrations'),
    pool: {connectionString: process.env.DATABASE_URI},
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  plugins: [tailwind, externals, safeAsyncEndpoints],
  graphQL: {
    queries: mergeQueries<unknown, unknown>({
      groupchatSearchToken: groupchatSearchTokenQuery,
      mayOperate: mayOperateQuery,
    }),
    mutations: mergeQueries<unknown, unknown>({
      mimicUserOperation: mimicUserOperationMutation,
    }),
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
};

export default buildConfig(config);
