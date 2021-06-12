import Router from "@koa/router";
import { grantRoutePrefix } from "../../config/grant";
import discordCallback from "./discordCallback";

const router = new Router({ prefix: grantRoutePrefix, methods: ["GET"] });
router.get("/discord/callback", discordCallback);

export default router;
