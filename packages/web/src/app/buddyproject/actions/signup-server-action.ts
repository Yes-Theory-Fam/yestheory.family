"use server";

import { graphqlWithHeaders } from "../../../lib/graphql/client";
import { headers } from "next/headers";

export const buddyProjectSignUp = async () => {
  const result = await graphqlWithHeaders((sdk) => sdk.BuddyProjectSignUp());

  // TODO invalidate cache of buddyproject here

  return result.buddyProjectSignUp.result;
};
