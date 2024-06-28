import {type GeneratedTypes, type Payload, type CollectionConfig, type ValidateOptions} from 'payload';
import {type Groupchat, type GroupchatKeyword} from '../../../payload-types';
import {allowUpdateDeleteOwner} from '../access/allow-update-delete-owner';
import {requireOneOf} from '../access/require-one-of';
import {typesenseClient} from '../lib/typesense';

type GroupchatPlatform =
  GeneratedTypes['collections']['groupchats']['platform'];
const platformUrlMatchers: Record<GroupchatPlatform, RegExp> = {
  discord: /^https?:\/\/(?:www\.)?discord\.(com|gg)\//i,
  instagram: /^https?:\/\/(?:www\.)?instagram\.com\//i,
  facebook: /^https?:\/\/(?:www\.)?facebook\.com\//i,
  signal: /^https?:\/\/(?:www\.)?signal\.group\//i,
  telegram: /^https?:\/\/(?:www\.)?t\.me\//i,
  whatsapp: /^https?:\/\/chat\.whatsapp\.com\//i,
};

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
      validate: async (nameValue, {data, req}) => {
        if (!nameValue) return 'This field is required.';

        // We need to run local operations with certain auth, so we skip if payload is not available
        if (!req.payload) return true;

        const matchingGroupchats = await (req.payload as Payload).find({
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
    {
      name: 'showUnauthenticated',
      type: 'checkbox',
      label: 'Show to unauthenticated users?',
      defaultValue: false,
      admin: {
        description:
          'This potentially allows bots to scrape this groupchat from the page. If you have measures to prevent botting, you can select this for more visibility.',
        // Facebook groups / Instagram profiles are always shown, so we just hide this checkbox in that case
        condition: (data) =>
          data.platform && !['facebook', 'instagram'].includes(data.platform),
      },
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

            if (value?.startsWith('http:')) {
              return 'https' + value.substring(4);
            }

            return value;
          },
        ],
      },
      validate: (url, {data}: ValidateOptions<Groupchat, unknown, object>) => {
        if (!data.platform) return true;
        if (!url) return 'This field is required.';

        const urlMatcher = platformUrlMatchers[data.platform];
        const match = (url as string).match(urlMatcher);

        if (!match) {
          return 'The URL must be a valid invite link for the selected platform!';
        }

        return true;
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
      defaultValue: 0,
      access: {
        read: requireOneOf('groupchats-admin'),
      },
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
              ('dataseeder' in context && context.dataseeder) ||
              !data
            ) {
              return;
            }

            const ownerId = req.user?.id;
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
      handler: async (req) => {
        if (!req.user) return new Response('Unauthorized', {status: 401});

        const groupchats = await req.json!();
        const first = groupchats[0];
        const hasPermission = await requireOneOf()({req, data: first});

        if (typeof hasPermission !== 'boolean' || !hasPermission) {
          return new Response('Forbidden', {status: 403});
        }

        for (const chat of groupchats) {
          try {
            await req.payload.create({
              collection: 'groupchats',
              data: chat,
              user: req.user,
            });
          } catch (e) {
            req.payload.logger.error(
              `Failed creating groupchat ${JSON.stringify(
                chat,
                null,
                2,
              )} in batch-endpoint: `,
            );
          }
        }

        return new Response('Ok', {status: 200});
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({doc, context, req}) => {
        if ('dataseeder' in context && context.dataseeder) return;

        const keywords =
          doc.keywords.length > 0
            ? await req.payload.find({
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
          promoted: doc.promoted ?? 0,
          showUnauthenticated: doc.showUnauthenticated ?? false,
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
