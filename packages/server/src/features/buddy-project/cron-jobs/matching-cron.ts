import { Client, Guild, Message, Snowflake } from "discord.js";
import { Service } from "typedi";
import winston from "winston";
import { Logger } from "../../../services/logging/log-service";
import { BlockService } from "../services/block-service";
import { BuddyProjectService } from "../services/buddy-project.service";
import { MatchService } from "../services/match-service";
import cron from "node-cron";

const partition = <T>(chunkSize = 2, ...items: T[]): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    if (chunk.length === chunkSize) chunks.push(chunk);
  }

  return chunks;
};

@Service()
export class MatchingCron {
  static readonly matchAmount = 100;
  static readonly cronSchedule = "*/30 * * * *"; // Every 30 minutes

  constructor(
    private matchService: MatchService,
    private buddyProjectService: BuddyProjectService,
    private blockService: BlockService,
    private client: Client,
    private guild: Guild,
    @Logger("buddy-project", "matching-cron") private logger: winston.Logger
  ) {
    this.init();
  }

  init() {
    cron.schedule(MatchingCron.cronSchedule, () => this.runMatching());
  }

  async runMatching() {
    const enabled = await this.matchService.isEnabled();
    this.logger.info(`Let's see if we should be matching ${enabled}`);
    if (!enabled) return;

    const idsToMatch = await this.buddyProjectService.getUnmatchedBuddyIds(
      MatchingCron.matchAmount
    );

    const pairs = partition(2, ...idsToMatch);
    this.logger.debug(`Matching ${pairs.length} pairs`);

    const matchingPromises = pairs.map((pair) =>
      this.match(pair as [string, string])
    );

    await Promise.all(matchingPromises);
    this.logger.info("Done matching!");
  }

  private async trySendQuestions(userId: string, message: string) {
    this.logger.debug(`Sending questions to ${userId}`);
    const member = await this.guild.members.fetch(userId);
    const dm = await member.createDM();

    try {
      return await dm.send(message);
    } catch (e) {
      await this.blockService.block(userId);
    }
  }

  private static async explainUnfortunateCircumstances(firstMessage: Message) {
    await firstMessage.delete();
    await firstMessage.channel.send(
      "Right, this one is going to be disappointing... I had already matched you " +
        "but your match had their DMs disabled, so I had to rollback everything.\n\n" +
        "This message was sent to make sure you are not left wondering why I sent you a message that suddenly vanished. " +
        "Don't worry, you are still signed up and will be matched soon (that time hopefully with better luck though)!"
    );
  }

  async match([first, second]: [Snowflake, Snowflake]) {
    try {
      await this.matchService.match([first, second]);
      const firstSentMessage = await this.trySendQuestions(
        first,
        `Your buddy is ${second} oddquestions`
      );
      if (!firstSentMessage) {
        await this.matchService.unmatch([first, second]);
        return;
      }

      const secondSentMessage = await this.trySendQuestions(
        second,
        `Your buddy is ${first} evenquestions`
      );
      if (!secondSentMessage) {
        await this.matchService.unmatch([first, second]);
        await this.blockService.block(second);
        await MatchingCron.explainUnfortunateCircumstances(firstSentMessage);
      }
    } catch (e) {
      this.logger.error("Error while matching", e);
    }
  }
}
