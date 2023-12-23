import path from 'path';
import {type Config} from 'payload/config';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

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
      replacement: path.resolve(__dirname, './external-empty-mock.js'),
    }));

    aliasArray.push(...replacements);

    const plugins = viteConfig.plugins ?? [];
    const pluginsWithPolyfills = [...plugins, nodePolyfills()];

    const merged = {
      ...viteConfig,
      plugins: pluginsWithPolyfills,
      resolve: {...(viteConfig.resolve ?? {}), alias: aliasArray},
    };

    return next ? next(merged) : merged;
  };

  return config;
};
