import { Ctx, Query, Resolver } from "type-graphql";
import { AuthenticatedUser } from "../AuthenticatedUser";
import { YtfApolloContext } from "../../../types";

@Resolver(AuthenticatedUser)
export class MeResolver {
  @Query(() => AuthenticatedUser, { nullable: true })
  me(@Ctx() { user }: YtfApolloContext): AuthenticatedUser | null {
    return user;
  }
}
