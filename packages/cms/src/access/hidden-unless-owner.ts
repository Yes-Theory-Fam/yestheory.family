import {type User} from 'payload/auth';
import {type SessionUser} from '../collections/users';

export const hiddenUnlessOwner = ({user}: {user: User}) => {
  const sessionUser = user as unknown as SessionUser;
  const roles =
    'roles' in sessionUser ? sessionUser.roles : sessionUser.user.roles;

  return !roles.includes('owner');
};
