import next from '@atmina/linting/eslint/next.js';
import recommended from '@atmina/linting/eslint/recommended.js';
import tailwind from '@atmina/linting/eslint/tailwind.js';
import officialNext from '@next/eslint-plugin-next';
import storybookPlugin from 'eslint-plugin-storybook';

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
const config = [
  ...recommended,
  tailwind,
  next(officialNext),
  {
    plugins: {storybook: storybookPlugin},
    files: [
      '**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)',
      '**/*.story.@(ts|tsx|js|jsx|mjs|cjs)',
    ],
    rules: {
      ...storybookPlugin.configs.recommended.overrides[0].rules,
    },
  },
  {
    plugins: {storybook: storybookPlugin},
    files: ['.storybook/main.@(js|cjs|mjs|ts)'],
    rules: {
      ...storybookPlugin.configs.recommended.overrides[1].rules,
    },
  },
];

export default config;
