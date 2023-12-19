/* eslint-disable @typescript-eslint/no-explicit-any */
import autoprefixer from 'autoprefixer';
import {type Config} from 'payload/config';
import tailwindcss from 'tailwindcss';

import '../styles/tailwind.css';

export const tailwind = (config: Config) => {
  const admin = (config.admin ??= {});
  const next = admin.vite;
  admin.vite = (viteConfig) => {
    viteConfig.css ??= {};
    viteConfig.css.postcss ??= {};
    if (typeof viteConfig.css.postcss === 'object') {
      viteConfig.css.postcss.plugins ??= [];
      viteConfig.css.postcss.plugins.push(tailwindcss);
      viteConfig.css.postcss.plugins.push(autoprefixer);
    }

    return next ? next(viteConfig) : viteConfig;
  };

  return config;
};
