import {Authorized, Ctx, Mutation} from 'type-graphql';
import winston from 'winston';
import {domain} from '../../../config/session';
import {Logger} from '../../../services/logging/log-service';
import {
  Resolver,
  ResolverTarget,
} from '../../../services/resolvers/resolver-directive';
import {YtfApolloContext} from '../../../types';
import {type AuthProvider} from '../../user';
import {AuthService, type YtfAuthContext} from '../auth-service';

@Resolver(ResolverTarget.PUBLIC)
class LogoutMutation {
  constructor(
    @Logger('auth', 'logout') private logger: winston.Logger,
    private authService: AuthService,
  ) {}

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: YtfApolloContext): Promise<boolean> {
    if (!ctx.user) throw new Error('Unauthenticated');

    const cookies = ctx.requestContext.cookies;
    await this.invalidateTokens(ctx.auth, ctx.user.type);
    cookies.set('koa.sess', null, {domain});
    cookies.set('koa.sess.sig', null, {domain});

    return true;
  }

  private async invalidateTokens(auth: YtfAuthContext, provider: AuthProvider) {
    const cookieNames = ['accessToken', 'refreshToken'] as const;

    const tokens = cookieNames
      .map((n) => auth[n])
      .filter((t): t is string => !!t);

    const invalidatePromises = tokens.map((t) =>
      this.authService.invalidateToken(t, provider),
    );

    await Promise.all(invalidatePromises);
  }
}
