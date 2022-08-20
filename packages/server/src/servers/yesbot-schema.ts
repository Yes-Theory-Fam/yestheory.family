import Koa from "koa";
import { getIntrospectionQuery } from "graphql";
import fetch from "node-fetch";
import { isDevelopment } from "../config";
import { createServerLogger } from "../services/logging/log";
import Router from "@koa/router";

const logger = createServerLogger("server", "yesbot-schema");

// To avoid exposing the entirety of YesBot's API to this backend, this server acts as a proxy to fetch the schema in CI
export const launchYesBotSchemaServer = () => {
  const basePort = Number(process.env.BACKEND_PORT ?? 5000);

  const yesbotServerPort = basePort + 1;
  const thisPort = basePort + 2;

  const app = new Koa();
  app.proxy = !isDevelopment;

  const router = new Router();
  router.post("/_yesbot-schema", async (ctx) => {
    const introspectionQuery = getIntrospectionQuery({ descriptions: false });
    const response = await fetch(
      `http://127.0.0.1:${yesbotServerPort}/graphql`,
      {
        method: "POST",
        body: JSON.stringify({ query: introspectionQuery }),
        headers: {
          "Content-Type": "application/json",
          "x-yesbot-authentication": process.env.YESBOT_API_TOKEN,
        },
      }
    );

    ctx.body = await response.json();
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen({ port: thisPort }, () =>
    logger.info(`Backend listening on port ${thisPort}`)
  );
};
