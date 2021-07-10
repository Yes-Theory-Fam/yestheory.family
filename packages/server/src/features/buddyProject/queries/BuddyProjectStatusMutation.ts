import {
  Ctx,
  Resolver,
  Mutation,
  Authorized,
  ObjectType,
  Field,
} from "type-graphql";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";
import { YtfApolloContext } from "../../../types";
import { BuddyProjectEntry } from "@yes-theory-fam/database";

enum BuddyProjectStatus {
  NOT_SIGNED_UP,
  SIGNED_UP,
  MATCHED,
}

@Resolver()
export class BuddyProjectStatusMutation {
  constructor(
    @Logger("buddy-project", "status") private logger: winston.Logger
  ) {}

  @Authorized()
  @Mutation()
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

@ObjectType()
class BuddyProjectStatusPayload {
  @Field()
  status: BuddyProjectStatus;

  @Field()
  buddy?: BuddyProjectEntry | null;

  constructor(status: BuddyProjectStatus, buddy?: BuddyProjectEntry | null) {
    this.status = status;
    this.buddy = buddy;
  }
}
