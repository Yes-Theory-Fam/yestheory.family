import path from 'path';
import {type Config} from 'payload/config';

const externalModules = ['autoprefixer', 'tailwindcss'];

export const externals = (config: Config) => {
  const admin = (config.admin ??= {});
  const next = admin.vite;

  admin.vite = (viteConfig) => {
    const existingAliases = viteConfig?.resolve?.alias ?? [];
    let aliasArray: {find: string | RegExp; replacement: string}[];

    if (Array.isArray(existingAliases)) {
      aliasArray = existingAliases;
    } else {
      aliasArray = Object.values(existingAliases);
    }

    const replacements = externalModules.map((m) => ({
      find: m,
      replacement: path.resolve(__dirname, './mocks/empty.js'),
    }));

    aliasArray.push(...replacements);
    aliasArray.push({
      find: '../lib/auth-strategy',
      replacement: path.resolve(__dirname, './mocks/auth-strategy.js'),
    });

    const merged = {
      ...viteConfig,
      resolve: {...(viteConfig.resolve ?? {}), alias: aliasArray},
    };

    return next ? next(merged) : merged;
  };

  return config;
};
