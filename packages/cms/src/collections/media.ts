import {type CollectionConfig} from 'payload/types';
import {requireOneOf} from '../access/require-one-of';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: false,
  },
  access: {
    create: requireOneOf(),
    read: () => true,
    update: requireOneOf(),
    delete: requireOneOf(),
  },
  fields: [],
};
