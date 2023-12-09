import {config} from 'dotenv';
import payload from 'payload';
import {type InitOptions} from 'payload/config';
import {ensureDbExists} from './utils/ensure-db-exists';

export const initPayload = async (additionalOptions?: Partial<InitOptions>) => {
  config();

  console.info('Ensuring database exists');
  await ensureDbExists();

  if (!process.env.PAYLOAD_SECRET) throw new Error('Missing PAYLOAD_SECRET');

  return await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    ...additionalOptions,
  });
};
