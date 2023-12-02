import express from "express";
import payload from "payload";
import { initPayload } from "./init-payload";
import { setupCronJobs } from "./cron-jobs";
import { typesenseReady } from "./lib/typesense";
import { ensureDbExists } from "./utils/ensure-db-exists";

require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
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
