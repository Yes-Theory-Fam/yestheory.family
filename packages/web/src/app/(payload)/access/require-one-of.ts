import {type GeneratedTypes} from 'payload';
import {type FieldAccess, type TypeWithID} from 'payload/types';
import {type SessionUser} from '../collections/users';

type Role = GeneratedTypes['collections']['users']['roles'][number];

export function requireOneOf(
  ...args: Role[]
): FieldAccess<unknown & TypeWithID, SessionUser> {
  return ({req}) => {
    const user = req.user;

    if (!user) {
      return false;
    }

    const argsWithOwner: Role[] = [...args, 'owner'];

    return argsWithOwner.some((arg) => user.roles.includes(arg));
  };
}
