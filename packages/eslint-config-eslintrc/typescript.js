const { typescriptRules } = require('./rules');

/**
 * TypeScript preset (ESLint 8 + eslintrc).
 *
 * Extends: base → @typescript-eslint/recommended → prettier.
 * Does not enable type-aware linting (`parserOptions.project`); add that in the
 * consuming repo if you need rules like `no-floating-promises`.
 *
 * Consumer usage:
 *   extends: ['@tieuhungv/eslint-config-eslintrc/typescript']
 */
module.exports = {
  extends: [
    require.resolve('./base'), // HV base JS rules + import + unused-imports.
    'plugin:@typescript-eslint/recommended', // TS recommended rules from the plugin.
    'prettier', // Disable ESLint stylistic rules that conflict with Prettier.
  ],

  // Required parser for `.ts`, `.tsx`, `.mts`, `.cts` syntax.
  parser: '@typescript-eslint/parser',

  // Register @typescript-eslint rules referenced in `extends` and `rules`.
  plugins: ['@typescript-eslint'],

  parserOptions: {
    ecmaVersion: 'latest', // Parse modern syntax (async, optional chaining, etc.).
    sourceType: 'module', // Files use ESM `import` / `export` by default.
  },

  // Overrides and additions on top of recommended; see rules.js for each rule.
  rules: typescriptRules,
};
