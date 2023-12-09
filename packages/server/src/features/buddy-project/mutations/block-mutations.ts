import {Arg, Mutation} from 'type-graphql';
import {
  Resolver,
  ResolverTarget,
} from '../../../services/resolvers/resolver-directive';
import {BlockService} from '../services/block-service';

@Resolver(ResolverTarget.YESBOT)
class BlockMutations {
  constructor(private blockService: BlockService) {}

  @Mutation(() => Boolean)
  public async unblock(@Arg('userId') userId: string): Promise<boolean> {
    await this.blockService.unblock(userId);
    return true;
  }
}
