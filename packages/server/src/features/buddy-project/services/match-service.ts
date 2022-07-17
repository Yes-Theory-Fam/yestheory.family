import { PrismaClient, PrismaPromise } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class MatchService {
  constructor(private prisma: PrismaClient) {}

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
