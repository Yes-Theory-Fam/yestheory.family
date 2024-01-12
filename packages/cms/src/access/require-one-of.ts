import {type GeneratedTypes} from 'payload';
import {type Access} from 'payload/config';
import {type FieldAccess, type TypeWithID} from 'payload/types';
import {type SessionUser} from '../collections/users';

type Role = GeneratedTypes['collections']['users']['roles'][number];

export function requireOneOf(
  ...args: Role[]
): FieldAccess<unknown & TypeWithID, SessionUser> {
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
