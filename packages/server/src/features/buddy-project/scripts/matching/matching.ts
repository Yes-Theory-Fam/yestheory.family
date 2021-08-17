import { config } from "dotenv";
config();
import { initialize } from "../../../discord";
import { PrismaClient, PrismaPromise } from "@yes-theory-fam/database/client";
import { Guild } from "discord.js";
import { createServerLogger } from "../../../../services/logging/log";
import { evenQuestions, intro, oddQuestions } from "./texts";

// TODO; also figure out sensible interval for the amount chosen.
const matchAmount = 100;

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
): Promise<boolean> => {
  logger.debug(`Sending questions to ${userId}`);
  const member = await guild.members.fetch(userId);
  const dm = await member.createDM();
  try {
    await dm.send(questions);
  } catch (e) {
    logger.error("Could not send DMs", e);
    // Assume that they have DMs disabled.
    // TODO handle; drag user in channel, ping, instructions for how to let poor YesBot contact them :c
    return false;
  }

  return true;
};

const match = async ([a, b]: [string, string], guild: Guild): Promise<void> => {
  logger.debug(`Matching ${a} with ${b}`);
  const matchA = matchWith(a, b);
  const matchB = matchWith(b, a);
  try {
    logger.debug("Updating database");
    // TODO roll back if messages could not be sent!
    await prisma.$transaction([matchA, matchB]);

    let sendResult = await trySendQuestions(
      a,
      `${intro}\n${oddQuestions}`,
      guild
    );
    if (!sendResult) return;

    sendResult &&= await trySendQuestions(
      b,
      `${intro}\n${evenQuestions}`,
      guild
    );
    // TODO also let the first person know that the DMs are disabled so they are not matched, also delete questions again
    if (!sendResult) return;
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

main().catch((e) => logger.error("Something exploded :c ", e));
