'use server';

import {graphqlWithHeaders} from '../../../../lib/graphql/client';

export const buddyProjectSignUp = async () => {
  const result = await graphqlWithHeaders((sdk) => sdk.BuddyProjectSignUp());

  return result.buddyProjectSignUp.result;
};
