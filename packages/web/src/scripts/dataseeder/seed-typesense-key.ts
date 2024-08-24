import {typesenseClient} from '../../app/(payload)/lib/typesense';

export const apiKey = 'yestheory-family-typesense-search-key';

export const seedTypesenseKey = async () => {
  try {
    await typesenseClient.keys().create({
      collections: ['*'],
      actions: ['documents:search'],
      value: apiKey,
      description: 'Default global search key',
    });
    console.info('Search API Key created!');
  } catch {
    console.info('Search API Key already exists!');
  }
};
