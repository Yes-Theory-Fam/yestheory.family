'use server';

import {type ReadonlyRequestCookies} from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import {cookies} from 'next/headers';
import {graphqlWithHeaders} from '../../lib/graphql/client';

const deleteCookie = (cookies: ReadonlyRequestCookies, name: string) => {
  const url = new URL(process.env.FRONTEND_URL);
  const rootDomain = url.hostname.split('.').slice(-2).join('.');

  cookies.set({
    name,
    domain: rootDomain,
    value: '',
    expires: 0,
    maxAge: 0,
    sameSite: 'none',
    secure: true,
  });
};

export const logout = async () => {
  await graphqlWithHeaders((sdk) => sdk.Logout({}));

  const cks = cookies();
  deleteCookie(cks, 'koa.sess');
  deleteCookie(cks, 'koa.sess.sig');
};
