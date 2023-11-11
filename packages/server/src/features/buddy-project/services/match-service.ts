import { PrismaClient, PrismaPromise } from "@prisma/client";
import { Service } from "typedi";
import { KeyValueStore } from "../../../services/key-value-store";

@Service()
export class MatchService {
  private static readonly _enabledKey = "buddy-project-matching-enabled";

  constructor(
    private prisma: PrismaClient,
    private keyValueStore: KeyValueStore,
  ) {}

  async isEnabled(): Promise<boolean> {
    const value = await this.keyValueStore.get(MatchService._enabledKey);

    return value === "true";
  }

  async setEnabled(enabled: boolean): Promise<void> {
    await this.keyValueStore.set(MatchService._enabledKey, enabled.toString());
  }

  async unmatch(userId: string | string[]) {
    const userIds = Array.isArray(userId) ? userId : [userId];

    await this.prisma.buddyProjectEntry.updateMany({
      where: { userId: { in: userIds } },
      data: { buddyId: null, matchedDate: null, reportedGhostDate: null },
    });
  }

  private matchWith(userId: string, buddyId: string): PrismaPromise<unknown> {
    return this.prisma.buddyProjectEntry.update({
      where: { userId },
      data: { buddyId, matchedDate: new Date() },
    });
  }

  async match([first, second]: [string, string]) {
    const firstMatch = this.matchWith(first, second);
    const secondMatch = this.matchWith(second, first);

    await this.prisma.$transaction([firstMatch, secondMatch]);
  }
}
