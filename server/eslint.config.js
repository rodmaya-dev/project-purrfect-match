// ESLint flat config for the server. Used by `npm run lint` to check src/**/*.ts.
const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const { defineConfig, globalIgnores } = require('eslint/config');

module.exports = defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  },
]);