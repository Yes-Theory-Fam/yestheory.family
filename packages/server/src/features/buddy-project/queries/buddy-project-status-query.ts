import { Ctx, Resolver, Authorized, Query } from "type-graphql";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";
import { YtfApolloContext } from "../../../types";
import { Service } from "typedi";
import {
  BuddyProjectStatus,
  BuddyProjectStatusPayload,
} from "../buddy-project-status";

@Service()
@Resolver()
export class BuddyProjectStatusQuery {
  constructor(
    @Logger("buddy-project", "status") private logger: winston.Logger
  ) {}

  @Authorized()
  @Query(() => BuddyProjectStatusPayload)
  public async getBuddyProjectStatus(
    @Ctx() { user, prisma }: YtfApolloContext
  ): Promise<BuddyProjectStatusPayload> {
    if (!user) throw new Error();

    const entry = await prisma.buddyProjectEntry.findUnique({
      where: { userId: user.id },
      include: { buddy: true },
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
