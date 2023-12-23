import type e from 'express';
import passport from 'passport';
import payload, {type GeneratedTypes} from 'payload';
import {NotFound} from 'payload/errors';
import {getUserIdFromRequest} from './get-user-id-from-request';

const toRequestUser = (user: GeneratedTypes['collections']['users']) => ({
  collection: 'users',
  id: user.id,
  user,
});

export class YtfAuthStrategy extends passport.Strategy {
  name = 'ytf-discord-auth-strategy';

  async _authenticate(req: e.Request): Promise<void> {
    const userId = await getUserIdFromRequest(req);

    if (!userId) return this.fail();

    try {
      const payloadUser = await payload.findByID({
        id: userId,
        collection: 'users',
      });

      this.success(toRequestUser(payloadUser));
    } catch (e) {
      if (e instanceof NotFound) {
        return this.fail();
      }

      this.error(e);
    }
  }

  async authenticate(req: e.Request): Promise<void> {
    try {
      await this._authenticate(req);
    } catch (e) {
      this.error(e);
    }
  }
}
