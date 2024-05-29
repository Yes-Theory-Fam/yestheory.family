import {initPayload} from '../init-payload';
import {typesenseReady} from '../lib/typesense';
import {seedGroupchats} from './seed-groupchats';
import {seedTypesenseKey} from './seed-typesense-key';
import {seedUsers} from './seed-users';

// TODO figure out how to run the seeder *through the bundler?*

export const main = async () => {
  await initPayload({
    config: await import('../../../payload.config').then(m => m.default)
  });

  await seedUsers();
  await seedGroupchats();

  await typesenseReady();
  await seedTypesenseKey();

  process.exit();
};

void main();
