import {type CollectionConfig} from 'payload/types';

export const GroupchatKeywords: CollectionConfig = {
  slug: 'groupchat-keywords',
  admin: {
    useAsTitle: 'value',
    hidden: true,
  },
  fields: [
    {
      name: 'value',
      type: 'text',
      label: 'Keyword',
    },
  ],
};
