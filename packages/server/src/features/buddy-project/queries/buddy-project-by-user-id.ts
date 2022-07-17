import { Arg, Query } from "type-graphql";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";
import { BuddyProjectStatusPayload } from "../buddy-project-status";
import { BuddyProjectService } from "../services/buddy-project.service";

@Resolver(ResolverTarget.YESBOT)
class BuddyProjectByUserIdQuery {
  constructor(private buddyProjectService: BuddyProjectService) {}

  @Query(() => BuddyProjectStatusPayload)
  public async getBuddy(
    @Arg("userId") userId: string
  ): Promise<BuddyProjectStatusPayload> {
    return await this.buddyProjectService.getBuddyProjectStatus(userId);
  }
}
