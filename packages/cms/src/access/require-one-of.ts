import {type GeneratedTypes} from 'payload';
import {type Access} from 'payload/config';
import {type SessionUser} from '../collections/users';

type Role = GeneratedTypes['collections']['users']['roles'][number];

export function requireOneOf(...args: Role[]): Access<unknown, SessionUser> {
  return ({req}) => {
    const user: SessionUser = req.user;
    if (!user?.user) {
      return false;
    }

    const argsWithOwner: Role[] = [...args, 'owner'];

    return argsWithOwner.some((arg) => user.user.roles.includes(arg));
  };
}
