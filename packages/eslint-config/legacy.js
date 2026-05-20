const nextConfig = require('./next');
const prettierConfig = require('eslint-config-prettier');

/**
 * Legacy migration preset (ESLint 9 flat config).
 *
 * Extends the full Next stack, then turns off or relaxes noisy rules for old
 * codebases. Still requires Node >= 18.18 — for Node 12 use
 * `@tieuhungv/eslint-config-eslintrc/legacy` instead.
 *
 * Consumer usage:
 *   module.exports = [...require('@tieuhungv/eslint-config/legacy')];
 */
module.exports = [
  ...nextConfig,

  {
    rules: {
      // --- Base JS (see packages/eslint-config-eslintrc/rules.js legacyRules) ---
      curly: 'off',
      eqeqeq: 'off',
      'no-console': 'off',
      'no-var': 'off',
      'prefer-const': 'off',

      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      'import/no-duplicates': 'off',
      'unused-imports/no-unused-imports': 'off',

      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  prettierConfig,
];
