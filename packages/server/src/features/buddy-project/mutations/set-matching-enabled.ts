import { Arg, Mutation } from "type-graphql";
import {
  Resolver,
  ResolverTarget,
} from "../../../services/resolvers/resolver-directive";
import { MatchService } from "../services/match-service";

@Resolver(ResolverTarget.YESBOT)
class SetMatchingEnabledMutation {
  constructor(private matchService: MatchService) {}

  @Mutation(() => Boolean)
  async setMatchingEnabled(@Arg("enabled") enabled: boolean): Promise<boolean> {
    await this.matchService.setEnabled(enabled);

    return true;
  }
}
