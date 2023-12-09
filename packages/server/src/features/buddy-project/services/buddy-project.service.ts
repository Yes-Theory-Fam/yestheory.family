import {PrismaClient} from '@prisma/client';
import {Service} from 'typedi';
import {
  BuddyProjectStatus,
  BuddyProjectStatusPayload,
} from '../buddy-project-status';

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

@Service()
export class BuddyProjectService {
  constructor(private prisma: PrismaClient) {}

  async getUnmatchedBuddyIds(limit: number): Promise<string[]> {
    const allAvailableIds = await this.prisma.buddyProjectEntry.findMany({
      select: {userId: true},
      where: {buddyId: null, blocked: false},
    });

    const shuffledIds = shuffle(...allAvailableIds.map(({userId}) => userId));
    return shuffledIds.slice(0, limit);
  }

  async getBuddyProjectStatus(
    userId: string,
  ): Promise<BuddyProjectStatusPayload> {
    const entry = await this.prisma.buddyProjectEntry.findUnique({
      where: {userId: userId},
      include: {buddy: true},
    });

    if (!entry) {
      return new BuddyProjectStatusPayload(BuddyProjectStatus.NOT_SIGNED_UP);
    }

    const buddy = entry.buddy;
    const status = buddy
      ? BuddyProjectStatus.MATCHED
      : BuddyProjectStatus.SIGNED_UP;

    return new BuddyProjectStatusPayload(status, buddy);
  }
}
