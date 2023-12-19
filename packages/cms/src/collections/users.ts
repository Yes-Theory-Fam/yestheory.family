import {type CollectionConfig} from 'payload/types';
import {ytfAuthStrategy} from '../lib/auth-strategy';

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
      required: true,
      label: 'Roles',
      defaultValue: [],
      options: [
        {label: 'Owner', value: 'owner'},
        {label: 'Groupchat-Admin', value: 'groupchat-admin'},
        {label: 'Groupchats', value: 'groupchats'},
      ],
    },
  ],
};
