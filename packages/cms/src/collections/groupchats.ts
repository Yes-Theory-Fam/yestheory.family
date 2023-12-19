import payload from 'payload';
import {type CollectionConfig} from 'payload/types';
import {allowUpdateDeleteOwner} from '../access/allow-update-delete-owner';
import {requireOneOf} from '../access/require-one-of';
import {typesenseClient} from '../lib/typesense';

export const Groupchats: CollectionConfig = {
  slug: 'groupchats',
  access: {
    read: () => true,
    create: requireOneOf('groupchats-admin', 'groupchats'),
    update: allowUpdateDeleteOwner,
    delete: allowUpdateDeleteOwner,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'url', 'platform'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        {label: 'Discord', value: 'discord'},
        {label: 'Facebook', value: 'facebook'},
        {label: 'Signal', value: 'signal'},
        {label: 'Telegram', value: 'telegram'},
        {label: 'WhatsApp', value: 'whatsapp'},
      ],
    },
    {name: 'description', type: 'text'},
    {
      name: 'url',
      type: 'text',
      required: true,
      hooks: {
        beforeValidate: [
          ({value}) => {
            if (value && !value.match(/^https?:\/\//i)) {
              return `https://${value}`;
            }

            return value;
          },
        ],
      },
    },
    {
      name: 'keywords',
      type: 'relationship',
      hasMany: true,
      relationTo: 'groupchat-keywords',
      required: true,
      minRows: 1,
      maxRows: 6,
    },
    {
      name: 'promoted',
      type: 'number',
      min: 0,
      max: 100,
      required: true,
      defaultValue: 0,
      admin: {
        description:
          'This value may be used to push results. A value of 0 means no promotion. Any value between 1 and 100 may be used to order promoted groupchats.',
      },
    },
    {
      name: 'owners',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        hidden: true,
      },
      hasMany: true,
      hooks: {
        beforeChange: [
          async ({operation, data, req}) => {
            if (operation !== 'create') return;

            const ownerId = req.user.id;
            data.owners ??= [];
            if (!data.owners.includes(ownerId)) data.owners.push(ownerId);
          },
        ],
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({doc, context}) => {
        if ('dataseeder' in context && context.dataseeder) return;

        const keywords = await payload.find({
          collection: 'groupchat-keywords',
          where: {id: {equals: doc.keywords.join(',')}},
        });

        const typesenseDoc = {
          ...doc,
          id: doc.id.toString(),
          keywords: keywords.docs.map((k) => k.value),
        };
        await typesenseClient
          .collections('groupchats')
          .documents()
          .upsert(typesenseDoc);
      },
    ],
    afterDelete: [
      async ({id}) => {
        await typesenseClient
          .collections('groupchats')
          .documents()
          .delete(id.toString());
      },
    ],
  },
};
