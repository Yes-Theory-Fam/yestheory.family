import {type GeneratedTypes} from 'payload';
import {apiKey} from '../../../../scripts/dataseeder/seed-typesense-key';
import {getAuthStateFromHeaders} from '../../lib/get-auth-state-from-headers';
import {typesenseClient} from '../../lib/typesense';
import {type QueryFactory} from '../../utils/merge-queries';

type GroupchatPlatform =
  GeneratedTypes['collections']['groupchats']['platform'];

export const groupchatSearchTokenQuery: QueryFactory<string, void> = (
  GraphQL,
) => ({
  type: new GraphQL.GraphQLNonNull(GraphQL.GraphQLString),
  args: {},
  resolve: async (_, __, {req}) => {
    const {isLoggedIn} = await getAuthStateFromHeaders(req.headers);

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
