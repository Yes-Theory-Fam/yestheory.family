import {type GeneratedTypes} from 'payload';
import {apiKey} from '../../dataseeder/seed-typesense-key';
import {getAuthStateFromRequest} from '../../lib/get-auth-state-from-request';
import {typesenseClient} from '../../lib/typesense';
import {type QueryFactory} from '../../utils/merge-queries';

type GroupchatPlatform =
  GeneratedTypes['collections']['groupchats']['platform'];

export const groupchatSearchTokenQuery: QueryFactory<string, void> = (
  GraphQL,
) => ({
  type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString),
  args: {},
  resolve: async (_: unknown, __, context) => {
    const {isLoggedIn} = await getAuthStateFromRequest(context.req);

    const accessiblePlatforms: GroupchatPlatform[] = ['facebook', 'instagram'];

    if (isLoggedIn) {
      accessiblePlatforms.push('discord', 'signal', 'telegram', 'whatsapp');
    }

    const filterBy = `platform:=[${accessiblePlatforms.join(
      ',',
    )}] || showUnauthenticated: true`;

    return typesenseClient
      .keys()
      .generateScopedSearchKey(apiKey, {filter_by: filterBy});
  },
});
