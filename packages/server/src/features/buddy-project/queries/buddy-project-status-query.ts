import {Authorized, Ctx, Query} from 'type-graphql';
import winston from 'winston';
import {Logger} from '../../../services/logging/log-service';
import {
  Resolver,
  ResolverTarget,
} from '../../../services/resolvers/resolver-directive';
import {YtfApolloContext} from '../../../types';
import {BuddyProjectStatusPayload} from '../buddy-project-status';
import {BuddyProjectService} from '../services/buddy-project.service';

@Resolver(ResolverTarget.PUBLIC)
class BuddyProjectStatusQuery {
  constructor(
    @Logger('buddy-project', 'status') private logger: winston.Logger,
    private buddyProjectService: BuddyProjectService,
  ) {}

  @Authorized()
  @Query(() => BuddyProjectStatusPayload)
  public async getBuddyProjectStatus(
    @Ctx() {user}: YtfApolloContext,
  ): Promise<BuddyProjectStatusPayload> {
    if (!user) throw new Error();

    return await this.buddyProjectService.getBuddyProjectStatus(user.id);
  }
}
