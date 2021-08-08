import { Authorized, Ctx, Query } from "type-graphql";
import { AuthenticatedUser } from "../authenticated-user";
import { YtfApolloContext } from "../../../types";
import { Logger } from "../../../services/logging/logService";
import winston from "winston";
import { Resolver } from "../../../services/resolvers/resolver-directive";

@Resolver(() => AuthenticatedUser)
class MeResolver {
  constructor(@Logger("user", "Me") private logger: winston.Logger) {}

  @Authorized()
  @Query(() => AuthenticatedUser, { nullable: true })
  me(@Ctx() { user }: YtfApolloContext): AuthenticatedUser | null {
    this.logger.debug("Returning user", user);
    return user;
  }
}
