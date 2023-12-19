import {URL} from 'url';
import {type opts} from 'koa-session';
import {isDevelopment} from './index';

const frontend = process.env.FRONTEND_HOST;

const getRootDomain = (urlString: string) => {
  const frontendHostName = new URL(urlString).hostname;
  const split = frontendHostName.split('.');
  return split.slice(split.length - 2, split.length).join('.');
};

export const domain = getRootDomain(frontend);

const sessionConfig: Partial<opts> = {
  key: 'koa.sess',
  secure: !isDevelopment,
  sameSite: 'none',
  path: '/',
  domain,
};

export default sessionConfig;
