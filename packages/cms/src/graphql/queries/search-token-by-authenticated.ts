import {type GeneratedTypes} from 'payload';
import {apiKey} from '../../dataseeder/seed-typesense-key';
import {typesenseClient} from '../../lib/typesense';
import {type QueryFactory} from '../../utils/merge-queries';

type GroupchatPlatform =
  GeneratedTypes['collections']['groupchats']['platform'];

export const searchTokenByAuthenticatedQuery: QueryFactory<
  string,
  {isAuthenticated: boolean}
> = (GraphQL) => ({
  type: GraphQL.GraphQLString,
  args: {isAuthenticated: {type: GraphQL.GraphQLBoolean}},
  resolve: async (_: unknown, {isAuthenticated}) => {
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
