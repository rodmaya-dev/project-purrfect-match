// Configuración plana de ESLint del servidor. La usa `npm run lint` para revisar los .ts.
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
    rules: {
      // Los parámetros que empiezan con guion bajo se permiten sin usar (p. ej. el middleware de errores de Express).
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]);