const reactConfig = require('./react');
const nextPlugin = require('@next/eslint-plugin-next');
const prettierConfig = require('eslint-config-prettier');

/**
 * Downgrades `error` severities from a plugin preset to `warn` for gradual adoption.
 * @param {Record<string, unknown>} rules
 */
const downgradeErrorsToWarnings = (rules) =>
  Object.fromEntries(
    Object.entries(rules).map(([ruleName, ruleValue]) => {
      if (ruleValue === 'error') {
        return [ruleName, 'warn'];
      }

      if (Array.isArray(ruleValue) && ruleValue[0] === 'error') {
        return [ruleName, ['warn', ...ruleValue.slice(1)]];
      }

      return [ruleName, ruleValue];
    }),
  );

/**
 * Next.js preset (ESLint 9 flat config).
 *
 * Extends: react preset + @next/eslint-plugin-next (recommended + core-web-vitals).
 * Includes JS/TS/React/Next rules — consumer should only spread this preset, not `react`.
 *
 * Consumer usage:
 *   module.exports = [...require('@tieuhungv/eslint-config/next')];
 */
module.exports = [
  ...reactConfig,

  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],

    plugins: {
      '@next/next': nextPlugin,
    },

    rules: {
      ...downgradeErrorsToWarnings(nextPlugin.configs.recommended.rules),
      ...downgradeErrorsToWarnings(nextPlugin.configs['core-web-vitals'].rules),

      '@next/next/no-html-link-for-pages': 'warn',
    },
  },

  prettierConfig,
];
