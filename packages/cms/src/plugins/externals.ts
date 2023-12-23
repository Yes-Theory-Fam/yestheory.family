import path from 'path';
import {type Config} from 'payload/config';

const externalModules = ['autoprefixer', 'tailwindcss', 'passport-custom'];

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
      replacement: path.resolve(__dirname, './external-empty-mock.js'),
    }));

    aliasArray.push(...replacements);

    const merged = {
      ...viteConfig,
      resolve: {...(viteConfig.resolve ?? {}), alias: aliasArray},
    };

    return next ? next(merged) : merged;
  };

  return config;
};
