import {upsert} from './upsert';

export const seedUsers = async () => {
  await upsert({
    key: 'id',
    collection: 'users',
    data: {
      id: process.env.INITIAL_ADMIN_ID,
      roles: ['owner'],
    },
  });

  await upsert({
    key: 'id',
    collection: 'users',
    data: {
      id: 'yesbot',
      enableAPIKey: true,
      apiKey: process.env.PAYLOAD_API_KEY,
      roles: ['owner'],
    },
  });
};
