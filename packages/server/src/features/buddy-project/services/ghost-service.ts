import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { BuddyProjectEntry } from "../../../__generated__/type-graphql";

export enum MarkGhostedError {
  NOT_SIGNED_UP,
  NOT_MATCHED,
  ALREADY_MARKED,
  BUDDY_MARKED_ALREADY,
  WAITED_TOO_LITTLE,
  MARKED_TOO_OFTEN,
}

// Hours required to pass after matching until being ghosted is acceptable
const matchedGhostedDifferenceHours = 24;

@Service()
export class GhostService {
  constructor(private prisma: PrismaClient) {}

  async getGhostedBefore(before: Date): Promise<BuddyProjectEntry[]> {
    return this.prisma.buddyProjectEntry.findMany({
      where: { reportedGhostDate: { lte: before } },
    });
  }

  async markAsGhosted(
    userId: string
  ): Promise<{ error: MarkGhostedError } | { buddyId: string }> {
    const existingEntry = await this.prisma.buddyProjectEntry.findUnique({
      where: { userId },
      select: {
        matchedDate: true,
        reportedGhostDate: true,
        ghostReportCount: true,
        buddyId: true,
        buddy: { select: { reportedGhostDate: true } },
      },
    });

    if (!existingEntry) return { error: MarkGhostedError.NOT_SIGNED_UP };

    const { matchedDate, reportedGhostDate, ghostReportCount } = existingEntry;
    if (!matchedDate || !existingEntry.buddyId) {
      return { error: MarkGhostedError.NOT_MATCHED };
    }

    if (reportedGhostDate) return { error: MarkGhostedError.ALREADY_MARKED };

    if (ghostReportCount >= 2) {
      return { error: MarkGhostedError.MARKED_TOO_OFTEN };
    }

    if (existingEntry.buddy?.reportedGhostDate !== null) {
      return { error: MarkGhostedError.BUDDY_MARKED_ALREADY };
    }

    const timeSinceMatching = Date.now() - matchedDate.getTime();
    const requiredTimeSinceMatching =
      matchedGhostedDifferenceHours * 60 * 60 * 1000;

    if (timeSinceMatching < requiredTimeSinceMatching) {
      return { error: MarkGhostedError.WAITED_TOO_LITTLE };
    }

    await this.prisma.buddyProjectEntry.update({
      where: { userId },
      data: {
        reportedGhostDate: new Date(),
        ghostReportCount: ghostReportCount + 1,
      },
    });

    return { buddyId: existingEntry.buddyId };
  }

  async markAsNotGhosting(userId: string) {
    await this.prisma.buddyProjectEntry.update({
      where: { buddyId: userId },
      data: { reportedGhostDate: null },
    });
  }

  async kick(userId: string) {
    await this.prisma.buddyProjectEntry.delete({ where: { userId } });
  }
}
