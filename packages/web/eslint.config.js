const storybookPlugin = require('eslint-plugin-storybook');

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
module.exports = [
  ...require('@atmina/linting/eslint/recommended'),
  require('@atmina/linting/eslint/tailwind'),
  require('@atmina/linting/eslint/next')(require('@next/eslint-plugin-next')),
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
