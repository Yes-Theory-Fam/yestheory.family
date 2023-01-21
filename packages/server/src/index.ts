import { PrismaClient } from "@prisma/client";
import { Client, Guild } from "discord.js";
import { config } from "dotenv";
import "reflect-metadata";
import { Container } from "typedi";
import { Discord } from "./features";
import { launchPublicServer } from "./servers";
import { launchYesBotServer } from "./servers/yesbot";
import { launchYesBotSchemaServer } from "./servers/yesbot-schema";
import { CronStartSideEffect } from "./services/cron/cron-start-side-effect";
import { createServerLogger } from "./services/logging/log";

config();

const logger = createServerLogger("src", "index");

const prisma = new PrismaClient();

const main = async () => {
  Container.set(PrismaClient, prisma);

  if (!process.env.IS_E2E) {
    const { client, guild } = await Discord.initialize();
    Container.set(Client, client);
    Container.set(Guild, guild);
  }

  await launchPublicServer();
  await launchYesBotServer();
  await launchYesBotSchemaServer();

  if (!process.env.IS_E2E) {
    Container.get(CronStartSideEffect);
  }
};

main().then(() => logger.debug("Launched server"));
