import { URL } from "node:url";
import type { SessionOptions } from "koa-session";
import { isDevelopment } from "./index";

const frontend = process.env.FRONTEND_HOST;

const getRootDomain = (urlString: string) => {
	const frontendHostName = new URL(urlString).hostname;
	const split = frontendHostName.split(".");
	return split.slice(split.length - 2, split.length).join(".");
};

export const domain = getRootDomain(frontend);

const sessionConfig: Partial<
	SessionOptions & { path: string; domain: string }
> = {
	key: "koa.sess",
	secure: !isDevelopment,
	sameSite: isDevelopment ? "" : "none",
	path: "/",
	domain,
	httpOnly: true,
};

export default sessionConfig;
