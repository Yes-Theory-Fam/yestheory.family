const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
module.exports = [
  ...require('@atmina/linting/eslint/recommended'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {'@typescript-eslint': typescriptEslintPlugin},
    languageOptions: {
      parser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {varsIgnorePattern: 'Resolver|Mutation|Query'},
      ],
    },
  },
];
