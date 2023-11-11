"use server";

import { cookies } from "next/headers";
import { graphqlWithHeaders } from "../../lib/graphql/client";

export const logout = async () => {
  await graphqlWithHeaders((sdk) => sdk.Logout({}));

  const cks = cookies();
  cks.delete("koa.sess");
  cks.delete("koa.sess.sig");
};
