import {type Payload} from 'payload';
import {setupGroupchatSync} from './groupchat-sync';

export const setupCronJobs = async (payload: Payload) => {
  await Promise.all([setupGroupchatSync(payload)]);
};
