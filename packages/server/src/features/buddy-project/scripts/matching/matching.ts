import { config } from "dotenv";
config();
import { initialize } from "../../../discord";
import { PrismaClient, PrismaPromise } from "@yes-theory-fam/database/client";
import { Guild, Message, TextChannel } from "discord.js";
import { createServerLogger } from "../../../../services/logging/log";
import { evenQuestions, intro, oddQuestions } from "./texts";
import path from "path";

// TODO; also figure out sensible interval for the amount chosen.
const matchAmount = 100;
const disabledDmsChannelName = "buddy-project-dms-disabled";

const prisma = new PrismaClient();
const logger = createServerLogger("buddyproject", "matching");

const shuffle = <T>(...items: T[]): T[] => {
  const copy = [...items];
  let currentIndex = items.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [copy[currentIndex], copy[randomIndex]] = [
      copy[randomIndex],
      copy[currentIndex],
    ];
  }

  return copy;
};

const partition = <T>(chunkSize = 2, ...items: T[]): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  return chunks;
};

const matchWith = (userId: string, buddyId: string): PrismaPromise<unknown> =>
  prisma.buddyProjectEntry.update({
    where: { userId },
    data: { buddyId },
  });

const trySendQuestions = async (
  userId: string,
  questions: string,
  guild: Guild
): Promise<Message | undefined> => {
  logger.debug(`Sending questions to ${userId}`);
  const member = await guild.members.fetch(userId);
  const dm = await member.createDM();
  try {
    return await dm.send(questions);
  } catch (e) {
    // Assume that they have DMs disabled.

    logger.error("Could not send DMs", e);
    const disabledDmsChannel = guild.channels.cache.find(
      (c): c is TextChannel => c.name === disabledDmsChannelName
    );
    if (!disabledDmsChannel) {
      const message = "Could not find disabled DMs channel";
      logger.error(message);
      throw new Error(message);
    }

    await disabledDmsChannel.permissionOverwrites.edit(userId, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: false,
    });

    const ping = await disabledDmsChannel.send({
      content: `<@${userId}>`,
      allowedMentions: { users: [userId] },
    });

    await ping.delete();
  }
};

const rollbackMatch = async (ids: [string, string]): Promise<void> => {
  await prisma.buddyProjectEntry.updateMany({
    data: { buddyId: null },
    where: { userId: { in: ids } },
  });
};

const match = async ([a, b]: [string, string], guild: Guild): Promise<void> => {
  logger.debug(`Matching ${a} with ${b}`);
  const matchA = matchWith(a, b);
  const matchB = matchWith(b, a);
  try {
    logger.debug("Updating database");
    await prisma.$transaction([matchA, matchB]);

    const firstSentMessage = await trySendQuestions(
      a,
      `${intro}\n${oddQuestions}`,
      guild
    );

    if (!firstSentMessage) {
      await rollbackMatch([a, b]);
      return;
    }

    const secondSentMessage = await trySendQuestions(
      b,
      `${intro}\n${evenQuestions}`,
      guild
    );

    if (secondSentMessage) return; // all is well, both parties received their questions

    await rollbackMatch([a, b]);
    await firstSentMessage.delete();
    await firstSentMessage.channel.send(
      "Right, this one is going to be disappointing... I had already matched you " +
        "but your match had their DMs disabled, so I had to rollback everything.\n\n" +
        "This message was sent to make sure you are not left wondering why I sent you a message that suddenly vanished. " +
        "Don't worry, you are still signed up and will be matched soon (that time with better luck though)!"
    );
  } catch (e) {
    logger.error("Error while matching: ", e);
  }
};

const main = async () => {
  const { client, guild } = await initialize();

  const availableIds = await prisma.buddyProjectEntry.findMany({
    select: { userId: true },
    where: { buddyId: null },
  });

  const shuffledIds = shuffle(...availableIds.map(({ userId }) => userId));
  const idsToMatch = shuffledIds.slice(0, matchAmount);
  const pairs = partition(2, ...idsToMatch);

  logger.debug(`Matching ${pairs.length} pairs!`);

  const matchingPromises = pairs.map((p) =>
    match(p as [string, string], guild)
  );

  await Promise.all(matchingPromises);
  logger.info("Done matching, destroying client in 3 seconds.");
  setTimeout(() => {
    console.log("Destroying client");
    client.destroy();
  }, 3000);

  prisma.$disconnect();
};

// Makeshift if __name__ == "__main__":
const absoluteScriptPath = path.resolve(process.cwd(), process.argv[1]);
const thisPath = path.normalize(__filename);
if (absoluteScriptPath === thisPath) {
  main().catch((e) => logger.error("Something exploded :c ", e));
}
