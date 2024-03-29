import {config} from 'dotenv';
import express from 'express';
import payload from 'payload';
import {setupCronJobs} from './cron-jobs';
import {initPayload} from './init-payload';
import {typesenseReady} from './lib/typesense';

config();

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  await initPayload({
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  await typesenseReady();
  await setupCronJobs();

  app.listen(3001);
};

start().catch(console.error);
