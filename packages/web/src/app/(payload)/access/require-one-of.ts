import {type GeneratedTypes, type FieldAccess, type TypeWithID} from 'payload';
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
