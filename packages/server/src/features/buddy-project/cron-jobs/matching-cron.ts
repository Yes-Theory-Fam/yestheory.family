import {Client, Guild, type Message, type Snowflake} from 'discord.js';
import cron from 'node-cron';
import {Service} from 'typedi';
import winston from 'winston';
import {Logger} from '../../../services/logging/log-service';
import {BlockService} from '../services/block-service';
import {BuddyProjectService} from '../services/buddy-project.service';
import {MatchService} from '../services/match-service';
import {evenQuestions, intro, oddQuestions} from './texts';

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
  static readonly cronSchedule = '*/30 * * * *'; // Every 30 minutes

  constructor(
    private matchService: MatchService,
    private buddyProjectService: BuddyProjectService,
    private blockService: BlockService,
    private client: Client,
    private guild: Guild,
    @Logger('buddy-project', 'matching-cron') private logger: winston.Logger,
  ) {
    this.init();
  }

  init() {
    cron.schedule(MatchingCron.cronSchedule, () => this.runMatching());
    this.logger.info('Buddy Project-matcher initialized');
  }

  async runMatching() {
    const enabled = await this.matchService.isEnabled();
    if (!enabled) return;

    const idsToMatch = await this.buddyProjectService.getUnmatchedBuddyIds(
      MatchingCron.matchAmount,
    );

    const pairs = partition(2, ...idsToMatch);
    if (pairs.length === 0) return;

    const matchingPromises = pairs.map((pair) =>
      this.match(pair as [string, string]),
    );

    await Promise.all(matchingPromises);
    this.logger.info(`Done matching ${pairs.length} pairs!`);
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
      'Right, this one is going to be disappointing... I had already matched you ' +
        'but your match had their DMs disabled, so I had to rollback everything.\n\n' +
        'This message was sent to make sure you are not left wondering why I sent you a message that suddenly vanished. ' +
        "Don't worry, you are still signed up and will be matched soon (that time hopefully with better luck though)!",
    );
  }

  async match([first, second]: [Snowflake, Snowflake]) {
    const infoChannel = this.guild.channels.cache.find(
      (c) => c.name === 'buddy-project-info',
    );

    try {
      await this.matchService.match([first, second]);
      const firstSentMessage = await this.trySendQuestions(
        first,
        `${intro(second, infoChannel)}\n\n${oddQuestions}`,
      );
      if (!firstSentMessage) {
        await this.matchService.unmatch([first, second]);
        return;
      }

      const secondSentMessage = await this.trySendQuestions(
        second,
        `${intro(first, infoChannel)}\n\n${evenQuestions}`,
      );
      if (!secondSentMessage) {
        await this.matchService.unmatch([first, second]);
        await this.blockService.block(second);
        await MatchingCron.explainUnfortunateCircumstances(firstSentMessage);
      }
    } catch (e) {
      this.logger.error('Error while matching', e);
    }
  }
}
