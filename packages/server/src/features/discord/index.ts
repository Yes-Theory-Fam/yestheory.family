import { Client, Guild, IntentsBitField } from "discord.js";
import { createServerLogger } from "../../services/logging/log";

const logger = createServerLogger("discord", "index");

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers],
});

interface DiscordValues {
  client: Client;
  guild: Guild;
}

export const initialize = async (skipLogin = false): Promise<DiscordValues> => {
  const guildId = process.env.DISCORD_TARGET_GUILD;
  if (!guildId) {
    throw new Error("Guild ID not specified!");
  }

  if (!skipLogin) {
    logger.info("Logging in with Discord client");
    await client.login(process.env.DISCORD_BOT_TOKEN);
  }

  if (!client.readyAt) {
    logger.info(
      "Client is not ready, delaying, retrying remaining initialization in a second."
    );
    return new Promise((res, rej) => {
      setTimeout(() => initialize(true).then(res).catch(rej), 1000);
    });
  }

  logger.debug("Client is ready, fetching guild!");
  const guild = await client.guilds.fetch(guildId);
  logger.info("Client initialized!");

  return { client, guild };
};
