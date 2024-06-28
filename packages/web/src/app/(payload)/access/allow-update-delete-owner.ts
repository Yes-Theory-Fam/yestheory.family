import {type AccessArgs} from 'payload';

export function allowUpdateDeleteOwner<TData>({req}: AccessArgs<TData>) {
  const user = req.user;
  if (!user) return false;

  const roles = user.roles;

  if (roles.includes('owner') || roles.includes('groupchats-admin')) {
    return true;
  }

  if (!roles.includes('groupchats')) return false;

  return {owners: {contains: user.id}};
}
