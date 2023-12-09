import type koa from 'koa';
import {type AuthenticatedUser} from '../features';
import {type YtfAuthContext} from '../features/auth/auth-service';

export interface YtfApolloContext {
  user: AuthenticatedUser | null;
  requestContext: koa.Context;
  auth: YtfAuthContext;
}
