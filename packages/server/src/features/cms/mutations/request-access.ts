import {ActionRowBuilder, ButtonBuilder, ButtonStyle, Client} from 'discord.js';
import {Arg, Mutation} from 'type-graphql';
import {
  Resolver,
  ResolverTarget,
} from '../../../services/resolvers/resolver-directive';

@Resolver(ResolverTarget.YESBOT)
export class RequestAccessMutation {
  constructor(private client: Client) {}

  @Mutation(() => Boolean)
  public async requestAccess(
    @Arg('userId') userId: string,
    @Arg('message') message: string,
  ): Promise<boolean> {
    const adminId = process.env.DISCORD_ADMIN_ID;

    const quotedMessage = message
      .split('\n')
      .map((l) => `> ${l}`)
      .join('\n');

    const composedMessage = `**Payload Access request**
    
    <@${userId}> requests access to Payload. Message:
    
    ${quotedMessage}`;

    const approvalButton = new ButtonBuilder({
      label: 'Approve',
      customId: `approve-payload-request`,
      style: ButtonStyle.Success,
    });

    const declineButton = new ButtonBuilder({
      label: 'Decline',
      customId: `decline-payload-request`,
      style: ButtonStyle.Danger,
    });

    const components = new ActionRowBuilder<ButtonBuilder>({
      components: [approvalButton, declineButton],
    });

    await this.client.users.send(adminId, {
      content: composedMessage,
      components: [components],
    });

    return true;
  }
}
