import { Authorized, Ctx, Query } from "type-graphql";
import { AuthenticatedUser } from "../authenticated-user";
import { YtfApolloContext } from "../../../types";
import { Logger } from "../../../services/logging/log-service";
import winston from "winston";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";

@Resolver(ResolverTarget.PUBLIC, () => AuthenticatedUser)
class MeResolver {
  constructor(@Logger("user", "Me") private logger: winston.Logger) {}

  @Authorized()
  @Query(() => AuthenticatedUser, { nullable: true })
  me(@Ctx() { user }: YtfApolloContext): AuthenticatedUser | null {
    this.logger.debug("Returning user", user);
    return user;
  }
}
