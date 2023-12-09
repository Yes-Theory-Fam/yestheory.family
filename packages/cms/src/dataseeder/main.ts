import path from 'node:path';

import {initPayload} from '../init-payload';
import {typesenseReady} from '../lib/typesense';
import {seedGroupchats} from './seed-groupchats';
import {seedTypesenseKey} from './seed-typesense-key';
import {seedUsers} from './seed-users';

export const main = async () => {
  process.env.PAYLOAD_CONFIG_PATH = path.resolve(
    __dirname,
    `../payload.config${path.extname(__filename)}`,
  );

  await initPayload({local: true});

  await seedUsers();
  await seedGroupchats();

  await typesenseReady();
  await seedTypesenseKey();

  process.exit();
};

void main();
