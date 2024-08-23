import {type AuthStrategyFunction, NotFound} from 'payload';
import {toRequestUser} from '../collections/users';
import {getAuthStateFromHeaders} from './get-auth-state-from-headers';

export const ytfAuthStrategy: AuthStrategyFunction = async ({
  payload,
  headers,
}) => {
  const {userId} = await getAuthStateFromHeaders(headers);

  if (!userId) return {user: null};

  try {
    const payloadUser = await payload.findByID({
      id: userId,
      collection: 'users',
    });

    return {user: toRequestUser(payloadUser)};
  } catch (e) {
    if (e instanceof NotFound) {
      return {user: null};
    }

    throw e;
  }
};
