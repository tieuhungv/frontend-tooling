const typescriptConfig = require('./typescript');
const prettierConfig = require('eslint-config-prettier');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const globals = require('globals');

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
 * React + TypeScript preset (ESLint 9 flat config).
 *
 * Extends: typescript preset + React + JSX runtime + React Hooks.
 * Use for React apps without Next.js. For Next.js use `@tieuhungv/eslint-config/next`.
 *
 * Consumer usage:
 *   module.exports = [...require('@tieuhungv/eslint-config/react')];
 */
module.exports = [
  ...typescriptConfig,

  {
    files: ['**/*.{jsx,tsx}'],

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // Spread recommended presets, but keep severity at warn except overrides below.
      ...downgradeErrorsToWarnings(reactPlugin.configs.recommended.rules),
      ...downgradeErrorsToWarnings(reactPlugin.configs['jsx-runtime'].rules),
      ...downgradeErrorsToWarnings(reactHooksPlugin.configs.recommended.rules),

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'warn',

      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    },
  },

  prettierConfig,
];
