import {type GeneratedTypes} from 'payload';
import {type Access} from 'payload/config';
import {type SessionUser} from '../collections/users';

type Role = GeneratedTypes['collections']['users']['roles'][number];

export function requireOneOf(...args: Role[]): Access<unknown, SessionUser> {
  return ({req}) => {
    const user: SessionUser = req.user;

    if (!user) {
      return false;
    }

    const roles = '_strategy' in user ? user.roles : user.user.roles;

    const argsWithOwner: Role[] = [...args, 'owner'];

    return argsWithOwner.some((arg) => roles.includes(arg));
  };
}
