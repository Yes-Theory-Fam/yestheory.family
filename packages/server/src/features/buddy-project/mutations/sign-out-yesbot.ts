import { Arg, Mutation } from "type-graphql";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";
import { GhostService } from "../services/ghost-service";

@Resolver(ResolverTarget.YESBOT)
class SignOutYesbotMutation {
  constructor(private ghostService: GhostService) {}

  @Mutation(() => Boolean)
  public async signOut(@Arg("userId") userId: string): Promise<boolean> {
    await this.ghostService.kick(userId);

    return true;
  }
}
