import {type CollectionConfig} from 'payload/types';
import {hiddenUnlessOwner} from '../access/hidden-unless-owner';
import {requireOneOf} from '../access/require-one-of';

export const Features: CollectionConfig = {
  slug: 'feature',
  access: {
    read: () => true,
    create: requireOneOf(),
    update: requireOneOf(),
    delete: requireOneOf(),
  },
  admin: {
    useAsTitle: 'name',
    hidden: hiddenUnlessOwner,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'pathPrefix',
      type: 'text',
      required: true,
    },
    {
      name: 'navPath',
      type: 'text',
      hooks: {
        beforeValidate: [({value, data}) => value ?? data.pathPrefix],
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
    },
  ],
};
