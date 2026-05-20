const { legacyRules } = require('./rules');

/**
 * Legacy migration preset (ESLint 8 + eslintrc).
 *
 * Extends the full Next stack (base → TS → React → Next) then disables or
 * softens rules that create too much noise in old codebases.
 *
 * Still requires Node >= 12.22 and ESLint 8 — this is not an older ESLint format.
 *
 * Consumer usage:
 *   extends: ['@hungvong/eslint-config-eslintrc/legacy']
 */
module.exports = {
  // Inherits: base → typescript → react → next → next/core-web-vitals.
  extends: [require.resolve('./next')],

  // Relaxed rules for old code; see `legacyRules` in rules.js for per-rule notes.
  rules: legacyRules,
};
