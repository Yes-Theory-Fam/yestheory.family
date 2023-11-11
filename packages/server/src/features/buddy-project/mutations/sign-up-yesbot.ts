import { PrismaClient, Prisma } from "@prisma/client";
import { Guild } from "discord.js";
import { Arg, Field, Mutation, ObjectType } from "type-graphql";
import winston from "winston";
import { Logger } from "../../../services/logging/log-service";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";

@Resolver(ResolverTarget.YESBOT)
class SignUpYesBotMutation {
  constructor(
    @Logger("buddy-project", "signup-yesbot") private logger: winston.Logger,
    private guild: Guild,
    private prisma: PrismaClient,
  ) {}

  @Mutation(() => BuddyProjectSignUpYesBotPayload)
  public async signUp(
    @Arg("userId") userId: string,
  ): Promise<BuddyProjectSignUpYesBotPayload> {
    // See https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
    const uniqueConstraintFailedCode = "P2002";

    try {
      await this.prisma.buddyProjectEntry.create({
        data: { userId },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === uniqueConstraintFailedCode
      ) {
        return new BuddyProjectSignUpYesBotPayload(
          false,
          "You are already signed up!",
        );
      }
    }

    const member = await this.guild.members.fetch(userId);
    if (!member) {
      return new BuddyProjectSignUpYesBotPayload(
        false,
        "I could not find you on the server!",
      );
    }

    const roleName = `Buddy Project ${new Date().getFullYear()}`;
    const role = await this.guild.roles.cache.find((r) => r.name === roleName);
    if (!role) {
      return new BuddyProjectSignUpYesBotPayload(
        false,
        "I could not find the Buddy Project role on the server!",
      );
    }

    await member.roles.add(role);

    return new BuddyProjectSignUpYesBotPayload(true);
  }
}

@ObjectType()
class BuddyProjectSignUpYesBotPayload {
  @Field()
  success: boolean;

  @Field(() => String, { nullable: true })
  error: string | null;

  constructor(success: boolean, error?: string) {
    this.success = success;
    this.error = error ?? null;
  }
}
