import {type GeneratedTypes} from 'payload';
import {type CollectionConfig} from 'payload/types';
import {requireOneOf} from '../access/require-one-of';
import {ytfAuthStrategy} from '../lib/auth-strategy';

export type SessionUser = {
  collection: 'users';
  id: string;
  user: GeneratedTypes['collections']['users'];
};

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
    create: () => false,
    update: requireOneOf(),
    delete: requireOneOf(),
    read: requireOneOf(),
  },
  admin: {
    useAsTitle: 'id',
  },
  endpoints: [
    {
      path: '/me',
      method: 'get',
      handler: (req, res) => {
        res.status(200).send(req.user);
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
