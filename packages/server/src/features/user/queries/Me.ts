import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { AuthenticatedUser } from "../AuthenticatedUser";
import { YtfApolloContext } from "../../../types";
import { Service } from "typedi";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";

@Service()
@Resolver(AuthenticatedUser)
export class MeResolver {
  constructor(@Logger("user", "Me") private logger: winston.Logger) {}

  @Authorized()
  @Query(() => AuthenticatedUser, { nullable: true })
  me(@Ctx() { user }: YtfApolloContext): AuthenticatedUser | null {
    this.logger.debug("Returning user", user);
    return user;
  }
}
