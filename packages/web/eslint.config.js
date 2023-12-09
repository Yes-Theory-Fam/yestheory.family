const storybookPlugin = require('eslint-plugin-storybook');

const storybookRules = storybookPlugin.configs.recommended.overrides.map(
  (conf) => ({...conf, plugins: {storybook: storybookPlugin}}),
);

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
module.exports = [
  ...require('@atmina/linting/eslint/recommended'),
  require('@atmina/linting/eslint/tailwind'),
  require('@atmina/linting/eslint/next')(require('@next/eslint-plugin-next')),
  ...storybookRules,
];
