import {type GeneratedTypes} from 'payload';
import {apiKey} from '../../dataseeder/seed-typesense-key';
import {typesenseClient} from '../../lib/typesense';
import {type QueryFactory} from '../../utils/merge-queries';

type GroupchatPlatform =
  GeneratedTypes['collections']['groupchats']['platform'];

export const groupchatSearchTokenQuery: QueryFactory<string, void> = (
  GraphQL,
) => ({
  type: GraphQL.GraphQLString,
  args: {},
  resolve: async (_: unknown, __, context) => {
    const isAuthenticated = !!context.req.user;

    const accessiblePlatforms: GroupchatPlatform[] = ['facebook'];

    if (isAuthenticated) {
      accessiblePlatforms.push('discord', 'signal', 'telegram', 'whatsapp');
    }

    const filterBy = `platform:=[${accessiblePlatforms.join(',')}]`;

    return typesenseClient
      .keys()
      .generateScopedSearchKey(apiKey, {filter_by: filterBy});
  },
});
