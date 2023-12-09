import {setupGroupchatSync} from './groupchat-sync';

export const setupCronJobs = async () => {
  await Promise.all([setupGroupchatSync()]);
};
