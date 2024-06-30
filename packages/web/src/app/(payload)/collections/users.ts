import {type GeneratedTypes, type CollectionConfig} from 'payload';
import {hiddenUnlessOwner} from '../access/hidden-unless-owner';
import {requireOneOf} from '../access/require-one-of';
import {AuthState} from '../lib/auth-state';
import {ytfAuthStrategy} from '../lib/auth-strategy';
import {getAuthStateFromHeaders} from '../lib/get-auth-state-from-headers';

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

export const toRequestUser = (
  user: GeneratedTypes['collections']['users'],
) => ({
  collection: 'users',
  ...user,
  // Not a fan of this but it's required to be a valid type for AuthStrategyFunction for now
  email: '',
});

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
    strategies: [
      {name: 'ytf-discord-auth-strategy', authenticate: ytfAuthStrategy},
    ],
  },
  access: {
    create: requireOneOf(),
    update: requireOneOf(),
    delete: requireOneOf(),
    read: ({req}) => {
      const {user} = req;
      if (!user) return false;

      if (user.roles.includes('owner')) return true;

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
      handler: async (req) => {
        const {isLoggedIn} = await getAuthStateFromHeaders(req.headers);
        if (!isLoggedIn) return new Response(AuthState.MISSING_COOKIE);

        const user = req.user as SessionUser | null;
        if (!user) return new Response(AuthState.MISSING_ACCESS);

        return new Response(AuthState.AUTHENTICATED);
      },
    },
    {
      path: '/request-access',
      method: 'post',
      handler: async (req) => {
        const {message} = await req.json!();

        const {userId} = await getAuthStateFromHeaders(req.headers);

        const gqlBody = {
          query: `mutation RequestAccess { requestAccess(userId: "${userId}", message: "${message}") }`,
          operationName: 'RequestAccess',
        };

        const internalBackend = process.env.INTERNAL_BACKEND_URL;
        const response = await fetch(`${internalBackend}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Yesbot-Authentication': process.env.YESBOT_API_AUTH_TOKEN ?? '',
          },
          body: JSON.stringify(gqlBody),
        });

        type AccessRequestResult = {data: null | {requestAccess: boolean}};
        const json = (await response.json()) as AccessRequestResult;

        if (json.data?.requestAccess) {
          return Response.json('Ok');
        }

        return Response.json('Bad request', {status: 400});
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
      required: true,
      options: [
        {label: 'Owner', value: 'owner'},
        {label: 'Groupchat-Admin', value: 'groupchats-admin'},
        {label: 'Groupchats', value: 'groupchats'},
      ],
    },
  ],
};
