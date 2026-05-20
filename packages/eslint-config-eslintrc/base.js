const { baseRules, ignorePatterns } = require('./rules');

/**
 * Base JavaScript preset (ESLint 8 + eslintrc).
 *
 * Consumer usage:
 *   module.exports = { extends: ['@hungvong/eslint-config-eslintrc'] };
 *
 * Requires Node >= 12.22 and `eslint@8` in the consuming repo.
 */
module.exports = {
  // Stop ESLint from searching parent directories for another config.
  root: true,

  // Global environments: browser APIs, Node APIs, ES2021 syntax/globals.
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parserOptions: {
    // Parse the newest syntax Prettier/ bundlers typically support.
    ecmaVersion: 'latest',
    // Treat files as ES modules (`import` / `export`).
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended', // Core ESLint recommended rules.
    'plugin:import/recommended', // Import hygiene from eslint-plugin-import.
    'prettier', // Disable ESLint rules that conflict with Prettier (eslint-config-prettier).
  ],

  plugins: [
    'import',
    'unused-imports', // Unused import removal and unused var reporting.
  ],

  settings: {
    'import/resolver': {
      node: {
        // File extensions the import resolver should try when resolving paths.
        extensions: ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx'],
      },
    },
  },

  ignorePatterns,
  rules: baseRules,
};
