import { Client, Guild } from "discord.js";
import { Service } from "typedi";
import cron from "node-cron";
import winston from "winston";
import { BuddyProjectEntry } from "../../../__generated__/type-graphql";
import { Logger } from "../../../services/logging/log-service";
import { GhostService } from "../services/ghost-service";
import { MatchService } from "../services/match-service";

// Hours between reporting being ghosted and being rematched
const ghostedRematchDifferenceHours = 24;

// Regex matching the ghost warning message
const ghostWarningMessageRegex = /^\*\*Buddy Project Ghosting\*\*$/gm;

@Service()
export class GhostCheckCron {
  private static cronSchedule = "*/10 * * * *"; // Every 10 minutes

  constructor(
    private ghostService: GhostService,
    private matchService: MatchService,
    private guild: Guild,
    private client: Client,
    @Logger("buddy-project", "ghost-check-cron") private logger: winston.Logger
  ) {
    this.init();
  }

  private init() {
    cron.schedule(GhostCheckCron.cronSchedule, () => this.checkForGhosting());
    this.logger.info("Ghost-Checker initialized");
  }

  async checkForGhosting() {
    const referenceTime = new Date();
    referenceTime.setHours(
      referenceTime.getHours() - ghostedRematchDifferenceHours
    );

    const relevantGhostedEntries = await this.ghostService.getGhostedBefore(
      referenceTime
    );

    const ghostHandlingPromises = relevantGhostedEntries.map((entry) =>
      this.handleGhoster(entry)
    );

    await Promise.all(ghostHandlingPromises);
  }

  private async handleGhoster({ userId, buddyId }: BuddyProjectEntry) {
    await this.matchService.unmatch(userId);
    if (buddyId) await this.ghostService.kick(buddyId);

    await this.notifyGhostedUser(userId);
    if (buddyId) await this.notifyGhostingUser(buddyId);
  }

  private async notifyGhostedUser(userId: string) {
    const user = await this.client.users.fetch(userId);
    const dm = await user.createDM();
    await dm.send(
      "Hey there! Sadly your buddy didn't respond to me in time, sorry! I removed your match so you will be rematched again soon :)"
    );
  }

  private async notifyGhostingUser(userId: string) {
    const user = await this.client.users.fetch(userId);
    const dm = await user.createDM();

    // Let's hope 50 are enough :)
    const lastMessages = await dm.messages.fetch({ limit: 50 });
    const ghostWarningMessage = lastMessages.find(
      (m) => m.author.bot && !!m.content.match(ghostWarningMessageRegex)
    );

    await ghostWarningMessage?.delete();

    await dm.send(
      `**Buddy Project Ghosted**

Hey there! It appears you have gone offline on us and didn't reach out to your buddy. I tried contacting you but without success 😦
As a consequence I removed your signup from the buddy project. Once you are around again, feel free to sign up again at <https://yestheory.family/buddyproject> and be sure to stick around on Discord!`
    );
  }
}
