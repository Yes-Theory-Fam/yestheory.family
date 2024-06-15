import {config} from 'dotenv';
import payload from 'payload';
import {type InitOptions} from 'payload/config';
// import {ensureDbExists} from './utils/ensure-db-exists';

export const initPayload = async (
  additionalOptions: Partial<InitOptions> & Pick<InitOptions, 'config'>,
) => {
  config();

  console.info('Ensuring database exists');
  // await ensureDbExists();

  return await payload.init({
    ...additionalOptions,
  });
};
