import {Ctx, Query} from 'type-graphql';
import winston from 'winston';
import {Logger} from '../../../services/logging/log-service';
import {
  Resolver,
  ResolverTarget,
} from '../../../services/resolvers/resolver-directive';
import {YtfApolloContext} from '../../../types';
import {AuthenticatedUser} from '../authenticated-user';

@Resolver(ResolverTarget.PUBLIC, AuthenticatedUser)
class MeResolver {
  constructor(@Logger('user', 'Me') private logger: winston.Logger) {}

  @Query(() => AuthenticatedUser, {nullable: true})
  me(@Ctx() {user}: YtfApolloContext): AuthenticatedUser | null {
    this.logger.debug('Returning user', user);
    return user;
  }
}
