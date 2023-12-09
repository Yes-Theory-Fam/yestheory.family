import Router from '@koa/router';
import {grantRoutePrefix} from '../../config/grant';
import discordCallback from './discord-callback';

const router = new Router({prefix: grantRoutePrefix, methods: ['GET']});
router.get('/discord/callback', discordCallback);

export default router;
