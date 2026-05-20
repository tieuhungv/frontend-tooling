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
 *
 * Per-rule notes also live in packages/eslint-config-eslintrc/rules.js (ESLint 8 stack).
 */
module.exports = [
  ...typescriptConfig,

  {
    // Only apply React/JSX rules to files that can contain JSX.
    files: ['**/*.{jsx,tsx}'],

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          // Required so ESLint parses JSX syntax in .jsx / .tsx files.
          jsx: true,
        },
      },
      globals: {
        // Browser globals (`window`, `document`, etc.) for client-side React code.
        ...globals.browser,
      },
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },

    settings: {
      react: {
        // Read React version from the consumer's `package.json` (avoids false positives).
        version: 'detect',
      },
    },

    rules: {
      // Plugin recommended presets; most severities downgraded to `warn` (see helper above).
      ...downgradeErrorsToWarnings(reactPlugin.configs.recommended.rules),
      ...downgradeErrorsToWarnings(reactPlugin.configs['jsx-runtime'].rules),
      ...downgradeErrorsToWarnings(reactHooksPlugin.configs.recommended.rules),

      // Off in TS projects: PropTypes are redundant when components are typed.
      'react/prop-types': 'off',

      // Off with React 17+ automatic JSX runtime: no `import React` per file.
      'react/react-in-jsx-scope': 'off',

      // Off: allow apostrophes and quotes in JSX text (e.g. "don't", `"hello"`).
      'react/no-unescaped-entities': 'off',

      // Error on invalid DOM props on React components; allow styling-library props below.
      'react/no-unknown-property': [
        'error',
        {
          // Prop names excluded from "unknown property" checks on custom components.
          ignore: [
            'css', // Emotion / styled-components `css` prop.
            'tw', // twin.macro `tw` prop.
          ],
        },
      ],

      // Off with automatic JSX runtime: `React` is not referenced as a value.
      'react/jsx-uses-react': 'off',

      // Warn when JSX-created variables look unused to core `no-unused-vars`.
      'react/jsx-uses-vars': 'warn',

      // Warn when `useEffect` / `useMemo` / etc. dependency arrays are incomplete.
      'react-hooks/exhaustive-deps': 'warn',

      // Error: invalid hook order or hooks in non-components break at runtime.
      'react-hooks/rules-of-hooks': 'error',
    },
  },

  // Disable stylistic ESLint rules that Prettier handles.
  prettierConfig,
];
