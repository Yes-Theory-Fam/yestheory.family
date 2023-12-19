import {type AccessArgs} from 'payload/config';
import {type SessionUser} from '../collections/users';

export function allowUpdateDeleteOwner<TData>({
  req,
}: AccessArgs<TData, SessionUser>) {
  const {user} = req;
  if (!user) return false;

  const roles = user.user.roles;

  if (roles.includes('owner') || roles.includes('groupchats-admin')) {
    return true;
  }

  if (!roles.includes('groupchats')) return false;

  return {owners: {contains: user.id}};
}
