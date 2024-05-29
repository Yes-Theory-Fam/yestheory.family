import {type ClientUser} from 'payload/auth';
import {type SessionUser} from '../collections/users';

export const hiddenUnlessOwner = ({user}: {user: ClientUser}) => {
  const sessionUser = user as unknown as SessionUser;
  if (!sessionUser) return false;

  const roles =
    'roles' in sessionUser ? sessionUser.roles : sessionUser.user.roles;

  return !roles.includes('owner');
};
