import {type GeneratedTypes} from 'payload';
import parseCookies from 'payload/dist/utilities/parseCookies';
import {type CollectionConfig} from 'payload/types';
import {requireOneOf} from '../access/require-one-of';
import {ytfAuthStrategy} from '../lib/auth-strategy';

export type SessionUser = {
  collection: 'users';
  id: string;
  user: GeneratedTypes['collections']['users'];
};

export const enum AuthState {
  MISSING_COOKIE = 'MISSING_COOKIE',
  MISSING_ACCESS = 'MISSING_ACCESS',
  AUTHENTICATED = 'AUTHENTICATED',
  LOADING = 'LOADING',
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: false,
    disableLocalStrategy: true,
    strategies: [
      {
        name: 'ytf-discord-strategy',
        strategy: ytfAuthStrategy,
      },
    ],
  },
  access: {
    create: requireOneOf(),
    update: requireOneOf(),
    delete: requireOneOf(),
    read: ({req, id}) => {
      const {user} = req;
      if (!user?.user) return false;

      const {roles} = user.user;
      if (roles.includes('owner')) return true;

      // Setting it up this way, hides the users collection from the UI while still allowing the /me endpoint to
      //   function.
      if (id) return user.user.id === id;

      return false;
    },
  },
  admin: {
    useAsTitle: 'id',
  },
  endpoints: [
    {
      path: '/auth-state',
      method: 'get',
      handler: async (req, res) => {
        const cookies = parseCookies(req);
        if (!cookies['koa.sess'])
          return res.status(200).send(AuthState.MISSING_COOKIE);

        const user = req.user as SessionUser;
        if (!user) return res.status(200).send(AuthState.MISSING_ACCESS);

        res.status(200).send(AuthState.AUTHENTICATED);
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
