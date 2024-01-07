import {type GeneratedTypes} from 'payload';
import parseCookies from 'payload/dist/utilities/parseCookies';
import {type CollectionConfig} from 'payload/types';
import {hiddenUnlessOwner} from '../access/hidden-unless-owner';
import {requireOneOf} from '../access/require-one-of';
import {YtfAuthStrategy} from '../lib/auth-strategy';
import {getUserIdFromRequest} from '../lib/get-user-id-from-request';

export type PayloadUser = GeneratedTypes['collections']['users'];

export type WebSessionUser = {
  collection: 'users';
  id: string;
  user: PayloadUser;
};

export type APIKeyUser = {
  id: string;
  roles: PayloadUser['roles'];
  _strategy: 'api-key';
};

export type SessionUser = WebSessionUser | APIKeyUser;

export const enum AuthState {
  MISSING_COOKIE = 'MISSING_COOKIE',
  MISSING_ACCESS = 'MISSING_ACCESS',
  AUTHENTICATED = 'AUTHENTICATED',
  LOADING = 'LOADING',
}

export const toRequestUser = (
  user: GeneratedTypes['collections']['users'],
) => ({
  collection: 'users',
  id: user.id,
  user,
});

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
    strategies: [
      {name: 'ytf-discord-auth-strategy', strategy: new YtfAuthStrategy()},
    ],
  },
  access: {
    create: requireOneOf(),
    update: requireOneOf(),
    delete: requireOneOf(),
    read: ({req}) => {
      const {user} = req;
      if (!user?.user) return false;

      const {roles} = user.user;
      if (roles.includes('owner')) return true;

      return true;
    },
  },
  admin: {
    useAsTitle: 'id',
    hidden: hiddenUnlessOwner,
  },
  endpoints: [
    {
      path: '/auth-state',
      method: 'get',
      handler: async (req, res) => {
        const cookies = parseCookies(req);
        if (!cookies['koa.sess']) {
          return res.status(200).send(AuthState.MISSING_COOKIE);
        }

        const user = req.user as SessionUser;
        if (!user) return res.status(200).send(AuthState.MISSING_ACCESS);

        res.status(200).send(AuthState.AUTHENTICATED);
      },
    },
    {
      path: '/request-access',
      method: 'post',
      handler: async (req, res) => {
        const {message} = req.body;

        const userId = await getUserIdFromRequest(req);

        const gqlBody = {
          query: `mutation RequestAccess { requestAccess(userId: "${userId}", message: "${message}") }`,
          operationName: 'RequestAccess',
        };

        const internalBackend = process.env.INTERNAL_BACKEND_URL;
        const response = await fetch(`${internalBackend}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Yesbot-Authentication': process.env.YESBOT_API_AUTH_TOKEN,
          },
          body: JSON.stringify(gqlBody),
        });

        type AccessRequestResult = {data: null | {requestAccess: boolean}};
        const json = (await response.json()) as AccessRequestResult;

        if (json.data?.requestAccess) {
          return res.status(200).send('Ok');
        }

        res.status(400).send('Bad request');
      },
    },
  ],
  fields: [
    {name: 'id', type: 'text'},
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      label: 'Roles',
      defaultValue: [],
      options: [
        {label: 'Owner', value: 'owner'},
        {label: 'Groupchat-Admin', value: 'groupchats-admin'},
        {label: 'Groupchats', value: 'groupchats'},
      ],
    },
  ],
};
