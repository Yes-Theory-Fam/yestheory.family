import {PrismaClient} from '@prisma/client';
import {Client, Guild, type TextChannel} from 'discord.js';
import {Service} from 'typedi';
import winston from 'winston';
import {Logger} from '../../../services/logging/log-service';

@Service()
export class BlockService {
  private static readonly DMS_DISABLED_CHANNEL_NAME =
    'buddy-project-dms-disabled';

  constructor(
    private guild: Guild,
    private client: Client,
    private prisma: PrismaClient,
    @Logger('buddy-project', 'block-service') private logger: winston.Logger,
  ) {}

  private async updateBlocked(userId: string, blocked: boolean) {
    await this.prisma.buddyProjectEntry.update({
      where: {userId},
      data: {blocked},
    });
  }

  async block(userId: string) {
    await this.updateBlocked(userId, true);
    await this.highlightDmsInfoChannel(userId);
  }

  async unblock(userId: string) {
    await this.updateBlocked(userId, false);
    await this.hideDmsInfoChannel(userId);
  }

  private getDmsInfoChannel(): TextChannel {
    const disabledDmsChannel = this.guild.channels.cache.find(
      (c): c is TextChannel =>
        c.name === BlockService.DMS_DISABLED_CHANNEL_NAME,
    );

    if (!disabledDmsChannel) {
      const message = 'Could not find disabled DMs channel';
      this.logger.error(message);
      throw new Error(message);
    }

    return disabledDmsChannel;
  }

  async highlightDmsInfoChannel(userId: string) {
    const disabledDmsChannel = this.getDmsInfoChannel();

    await disabledDmsChannel.permissionOverwrites.edit(userId, {
      ViewChannel: true,
      SendMessages: false,
    });

    const ping = await disabledDmsChannel.send({
      content: `<@${userId}>`,
      allowedMentions: {users: [userId]},
    });
    await ping.delete();
  }

  async hideDmsInfoChannel(userId: string) {
    const disabledDmsChannel = this.getDmsInfoChannel();

    await disabledDmsChannel.permissionOverwrites.delete(userId);
  }
}
