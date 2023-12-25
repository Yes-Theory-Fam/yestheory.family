'use server';

import {type ReadonlyRequestCookies} from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import {cookies} from 'next/headers';
import {graphqlWithHeaders} from '../../lib/graphql/client';

const isDevelopment = process.env.NODE_ENV === 'development';

const deleteCookie = (cookies: ReadonlyRequestCookies, name: string) => {
  cookies.set({
    name,
    value: '',
    expires: 0,
    maxAge: 0,
    sameSite: 'none',
    secure: !isDevelopment,
    domain: '.yestheory.family',
  });
};

export const logout = async () => {
  await graphqlWithHeaders((sdk) => sdk.Logout({}));

  const cks = cookies();
  deleteCookie(cks, 'koa.sess');
  deleteCookie(cks, 'koa.sess.sig');
};
