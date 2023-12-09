import {type Middleware} from '@koa/router';
import {type GrantResponse} from 'grant';
import {createServerLogger} from '../../services/logging/log';
import {type YtfApolloContext} from '../../types';
import {AuthenticatedUser} from '../user';

const logger = createServerLogger('auth', 'DiscordCallback');

const fallbackRedirect = process.env.FRONTEND_HOST ?? 'https://example.com';

const discordCallback: Middleware<unknown, YtfApolloContext> = (ctx) => {
  logger.debug('Received oAuth callback for Discord');

  if (!ctx.session) {
    logger.error('No session found!');
    throw new Error('No session found!');
  }

  const response = ctx.session?.grant.response as GrantResponse;

  const lastLocationKey = 'last_location';
  const lastLocation = ctx.cookies.get(lastLocationKey) ?? fallbackRedirect;

  if (!response.raw) {
    ctx.redirect(lastLocation);
    return;
  }

  ctx.session.grant = null;
  ctx.session.user = AuthenticatedUser.fromDiscordProfile(response.profile);

  const expiresAt = Date.now() + parseInt(response.raw.expires_in) * 1000;
  ctx.session.auth = {
    accessToken: response.access_token ?? '',
    refreshToken: response.refresh_token ?? '',
    expiresAt: expiresAt.toString(),
  };

  ctx.session.save();

  ctx.cookies.set(lastLocationKey, null);

  ctx.redirect(lastLocation);
};

export default discordCallback;
