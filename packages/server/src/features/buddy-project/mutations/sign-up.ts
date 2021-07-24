import { Authorized, Ctx, Mutation } from "type-graphql";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";
import { YtfApolloContext } from "../../../types";
import { AuthProvider } from "../../user";
import {
  BuddyProjectStatus,
  BuddyProjectStatusPayload,
} from "../buddy-project-status";
import { Resolver } from "../../../services/resolvers/resolver-directive";

@Resolver()
class SignUpMutation {
  constructor(
    @Logger("buddy-project", "signup") private logger: winston.Logger
  ) {}

  @Authorized()
  @Mutation(() => BuddyProjectStatusPayload)
  public async signUp(
    @Ctx() { prisma, user }: YtfApolloContext
  ): Promise<BuddyProjectStatusPayload> {
    if (!user || user.type !== AuthProvider.DISCORD) {
      throw new Error("Cannot sign up user who isn't logged in with Discord!");
    }

    // See https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
    const uniqueConstraintFailedCode = "P2002";

    try {
      await prisma.buddyProjectEntry.create({ data: { userId: user.id } });
    } catch (e) {
      if (e.code === uniqueConstraintFailedCode) {
        throw new Error("User already signed up!");
      }

      throw e;
    }

    this.logger.debug(`Signed up ${user.id} to the buddy project.`);
    return new BuddyProjectStatusPayload(BuddyProjectStatus.SIGNED_UP, null);
  }
}
