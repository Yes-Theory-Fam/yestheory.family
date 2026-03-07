import {cache} from 'react';
import {graphqlWithHeaders} from '../../lib/graphql/client';

export const getCurrentUser = cache(async () => {
  const response = await graphqlWithHeaders((sdk) => sdk.CurrentUser());

  return response.me ?? undefined;
});

export const getIsLoggedIn = async () => getCurrentUser().then((u) => !!u);
