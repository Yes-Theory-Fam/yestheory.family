import {PrismaClient} from '@prisma/client';
import {Service} from 'typedi';
import {type BuddyProjectEntry} from '../../../__generated__/type-graphql';

export enum MarkGhostedError {
  NOT_SIGNED_UP,
  NOT_MATCHED,
  ALREADY_MARKED,
  BUDDY_MARKED_ALREADY,
  WAITED_TOO_LITTLE_AFTER_MATCH,
  MARKED_TOO_OFTEN,
  WAITED_TOO_LITTLE_AFTER_GHOST,
}

// Hours required to pass after matching until being ghosted is acceptable
const matchedGhostedDifferenceHours = 24;

@Service()
export class GhostService {
  constructor(private prisma: PrismaClient) {}

  async getGhostedBefore(before: Date): Promise<BuddyProjectEntry[]> {
    return this.prisma.buddyProjectEntry.findMany({
      where: {reportedGhostDate: {lte: before}},
    });
  }

  async markAsGhosted(
    userId: string,
  ): Promise<{error: MarkGhostedError} | {buddyId: string}> {
    const existingEntry = await this.prisma.buddyProjectEntry.findUnique({
      where: {userId},
      select: {
        matchedDate: true,
        reportedGhostDate: true,
        ghostReportCount: true,
        buddyId: true,
        buddy: {
          select: {reportedGhostDate: true, confirmedNotGhostingDate: true},
        },
      },
    });

    if (!existingEntry) return {error: MarkGhostedError.NOT_SIGNED_UP};

    const {matchedDate, reportedGhostDate, ghostReportCount} = existingEntry;
    if (!matchedDate || !existingEntry.buddyId) {
      return {error: MarkGhostedError.NOT_MATCHED};
    }

    if (reportedGhostDate) return {error: MarkGhostedError.ALREADY_MARKED};

    if (ghostReportCount >= 2) {
      return {error: MarkGhostedError.MARKED_TOO_OFTEN};
    }

    if (existingEntry.buddy?.reportedGhostDate !== null) {
      return {error: MarkGhostedError.BUDDY_MARKED_ALREADY};
    }

    const timeSinceMatching = Date.now() - matchedDate.getTime();
    const requiredTime = matchedGhostedDifferenceHours * 60 * 60 * 1000;

    if (timeSinceMatching < requiredTime) {
      return {error: MarkGhostedError.WAITED_TOO_LITTLE_AFTER_MATCH};
    }

    const lastConfirmedNotGhosting =
      existingEntry.buddy.confirmedNotGhostingDate?.getTime() ?? 0;
    const timeSinceNotGhostConfirmation = Date.now() - lastConfirmedNotGhosting;

    if (timeSinceNotGhostConfirmation < requiredTime) {
      return {error: MarkGhostedError.WAITED_TOO_LITTLE_AFTER_GHOST};
    }

    await this.prisma.buddyProjectEntry.update({
      where: {userId},
      data: {
        reportedGhostDate: new Date(),
        ghostReportCount: ghostReportCount + 1,
      },
    });

    return {buddyId: existingEntry.buddyId};
  }

  async markAsNotGhosting(userId: string) {
    const clearGhostDate = this.prisma.buddyProjectEntry.update({
      where: {buddyId: userId},
      data: {reportedGhostDate: null},
    });

    const updateConfirmNotGhosting = this.prisma.buddyProjectEntry.update({
      where: {userId},
      data: {confirmedNotGhostingDate: new Date()},
    });

    await this.prisma.$transaction([clearGhostDate, updateConfirmNotGhosting]);
  }

  async kick(userId: string) {
    await this.prisma.buddyProjectEntry.delete({where: {userId}});
  }
}
