import payload, {type Payload} from 'payload';
import {type CollectionConfig} from 'payload/types';
import {allowUpdateDeleteOwner} from '../access/allow-update-delete-owner';
import {requireOneOf} from '../access/require-one-of';
import {typesenseClient} from '../lib/typesense';
import {type GroupchatKeyword} from '../payload-types';

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
      required: true,
      validate: async (nameValue, {data, payload}) => {
        // We need to run local operations with certain auth, so we skip if payload is not available
        if (!payload) return true;

        const matchingGroupchats = await (payload as Payload).find({
          collection: 'groupchats',
          where: {
            name: {equals: nameValue},
            platform: {equals: data.platform},
          },
        });

        const othersMatching = matchingGroupchats.docs.filter(
          (d) => d.id !== data.id,
        );

        if (othersMatching.length > 0) {
          return 'Names must be unique on their respective platform!';
        }

        return true;
      },
    },
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        {label: 'Discord', value: 'discord'},
        {label: 'Facebook', value: 'facebook'},
        {label: 'Instagram', value: 'instagram'},
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
          async ({operation, context, data, req}) => {
            if (
              operation !== 'create' ||
              ('dataseeder' in context && context.dataseeder)
            ) {
              return;
            }

            const ownerId = req.user.id;
            data.owners ??= [];
            if (!data.owners.includes(ownerId)) data.owners.push(ownerId);
          },
        ],
      },
    },
  ],
  endpoints: [
    {
      method: 'post',
      path: '/create-many',
      handler: async (req, res) => {
        if (!req.user) return res.status(401).send('Unauthorized');

        const first = req.body[0];
        const hasPermission = await requireOneOf()({req, data: first});

        if (typeof hasPermission !== 'boolean' || !hasPermission) {
          return res.status(403).send('Forbidden');
        }

        for (const chat of req.body) {
          await req.payload.create({
            collection: 'groupchats',
            data: chat,
            user: req.user,
          });
        }

        res.status(200).send('Ok');
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({doc, context}) => {
        if ('dataseeder' in context && context.dataseeder) return;

        const keywords =
          doc.keywords.length > 0
            ? await payload.find({
                collection: 'groupchat-keywords',
                where: {
                  id: {
                    in: doc.keywords.map((k: number | GroupchatKeyword) =>
                      typeof k === 'number' ? k : k.id,
                    ),
                  },
                },
              })
            : {docs: []};

        const {owners, ...sanitized} = doc;
        const typesenseDoc = {
          ...sanitized,
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
          .documents(id.toString())
          .delete();
      },
    ],
  },
};
