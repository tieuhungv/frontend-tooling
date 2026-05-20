const { nextRules } = require('./rules');

/**
 * Next.js preset (ESLint 8 + eslintrc).
 *
 * Extends: react → `next/core-web-vitals` (Next.js + Core Web Vitals rules).
 * Use this for Next.js apps on Node 12.22+; do not also extend `react` separately.
 *
 * Consumer usage:
 *   extends: ['@tieuhungv/eslint-config-eslintrc/next']
 */
module.exports = {
  extends: [
    require.resolve('./react'), // HV base + TS + React + Hooks.
    // eslint-config-next: Next.js lint rules + Core Web Vitals (LCP, CLS, etc.).
    'next/core-web-vitals',
  ],

  // Small overrides on top of Next presets; see nextRules in rules.js.
  rules: nextRules,
};
