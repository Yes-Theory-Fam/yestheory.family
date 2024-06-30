import {typesenseReady} from '../../app/(payload)/lib/typesense';
import {seedGroupchats} from './seed-groupchats';
import {seedTypesenseKey} from './seed-typesense-key';
import {seedUsers} from './seed-users';

export const main = async () => {
  await seedUsers();
  await seedGroupchats();

  await typesenseReady();
  await seedTypesenseKey();

  process.exit();
};

void main();
