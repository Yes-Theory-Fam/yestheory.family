import {Strategy as CustomStrategy, type VerifyCallback} from 'passport-custom';
import payload, {type GeneratedTypes} from 'payload';
import {NotFound} from 'payload/errors';
import {getUserIdFromRequest} from './get-user-id-from-request';

const toRequestUser = (user: GeneratedTypes['collections']['users']) => ({
  collection: 'users',
  id: user.id,
  user,
});

type AsyncVerifyCallback = (
  ...args: Parameters<VerifyCallback>
) => Promise<void>;
const login: AsyncVerifyCallback = async (req, done) => {
  const userId = await getUserIdFromRequest(req);

  if (!userId) return done(null, null);

  try {
    const payloadUser = await payload.findByID({
      id: userId,
      collection: 'users',
    });

    done(null, toRequestUser(payloadUser));
  } catch (e) {
    if (e instanceof NotFound) {
      return done(null, null);
    }

    done(e);
  }
};

export const ytfAuthStrategy = new CustomStrategy((req, done) =>
  login(req, done).catch(done),
);
