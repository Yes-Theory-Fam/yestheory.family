import { Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";
import { YtfApolloContext } from "../../../types";
import { AuthProvider } from "../../user";

@Resolver()
export class SignUp {
  constructor(
    @Logger("buddy-project", "signup") private logger: winston.Logger
  ) {}

  @Mutation()
  @Authorized()
  public async signUp(
    @Ctx() { prisma, user }: YtfApolloContext
  ): Promise<boolean> {
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
    }

    this.logger.debug(`Signed up ${user.id} to the buddy project.`);
    return true;
  }
}
