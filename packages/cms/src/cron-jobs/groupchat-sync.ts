import {schedule} from 'node-cron';
import payload from 'payload';
import {type CollectionCreateSchema} from 'typesense/lib/Typesense/Collections';
import {typesenseClient} from '../lib/typesense';

// TODO see if we can remove this alltogether thanks to the hook
export const setupGroupchatSync = async () => {
  console.info('Setting up groupchats!');
  await ensureTypesenseCollectionExists();

  const everyHour = '0 * * * *';
  schedule(everyHour, syncGroupchatsToTypesense, {runOnInit: true});
};

const collectionName = 'groupchats';
const schema: CollectionCreateSchema = {
  name: collectionName,
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'keywords',
      type: 'string[]',
      optional: true,
    },
    {
      name: 'url',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
      optional: true,
    },
    {
      name: 'platform',
      type: 'string',
      facet: true,
    },
    {
      name: 'showUnauthenticated',
      type: 'bool',
    },
    {
      name: 'promoted',
      type: 'int32',
    },
  ],
};

const ensureTypesenseCollectionExists = async () => {
  const schemaExists = await typesenseClient
    .collections(collectionName)
    .exists();

  if (schemaExists) {
    console.info(
      "Groupchats already schema exists in typesense, let's delete so we can update!",
    );
    await typesenseClient.collections(collectionName).delete();
  }

  await typesenseClient.collections().create(schema);
  console.info('Schema is up to date in Typesense');
};

const syncGroupchatsToTypesense = async () => {
  console.info('Syncing groupchats to Typesense');

  try {
    const {docs: groupchats} = await payload.find({
      collection: collectionName,
      pagination: false,
      depth: 2,
    });

    const typesenseChats = groupchats.map(
      ({id, createdAt, updatedAt, keywords, showUnauthenticated, ...rest}) => ({
        ...rest,
        id: id.toString(),
        showUnauthenticated: showUnauthenticated ?? false,
        keywords:
          keywords?.map((keyword) =>
            typeof keyword === 'object' ? keyword.value : undefined,
          ) ?? [],
      }),
    );

    if (typesenseChats.length === 0) {
      console.info('No groupchats available, skipping import');
      return;
    }

    await typesenseClient
      .collections(collectionName)
      .documents()
      .import(typesenseChats, {action: 'upsert'});

    console.info(`Synced ${groupchats.length} groupchats to Typesense`);
  } catch (e) {
    console.error(e);
  }
};
