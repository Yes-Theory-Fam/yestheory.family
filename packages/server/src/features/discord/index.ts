import { Client, Guild } from "discord.js";
import { createServerLogger } from "../../services/logging/log";

const logger = createServerLogger("discord", "index");

const bot = new Client();

export let targetGuild: Guild | undefined;

export const initialize = async (skipLogin = false): Promise<void> => {
  const guildId = process.env.DISCORD_TARGET_GUILD;
  if (!guildId) {
    throw new Error("Guild ID not specified!");
  }

  if (!skipLogin) {
    logger.info("Logging in with Discord client");
    await bot.login(process.env.DISCORD_BOT_TOKEN);
  }

  if (!bot.readyAt) {
    logger.info(
      "Client is not ready, delaying, retrying remaining initialization in a second."
    );
    return new Promise((res, rej) => {
      setTimeout(() => initialize(true).then(res).catch(rej), 1000);
    });
  }

  logger.debug("Client is ready, fetching guild!");
  targetGuild = await bot.guilds.fetch(guildId, true);
  logger.info("Client initialized!");
};
