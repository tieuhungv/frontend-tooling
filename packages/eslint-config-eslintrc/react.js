const { reactRules } = require('./rules');

/**
 * React + TypeScript preset (ESLint 8 + eslintrc).
 *
 * Extends: typescript → react/recommended → react/jsx-runtime → react-hooks → prettier.
 * Includes TS + React + Hooks; use this for Vite/CRA/component libraries (not Next).
 *
 * Consumer usage:
 *   extends: ['@hv/eslint-config-eslintrc/react']
 */
module.exports = {
  extends: [
    require.resolve('./typescript'), // HV base + TypeScript rules.
    'plugin:react/recommended', // React best practices (severity tuned in `rules`).
    'plugin:react/jsx-runtime', // React 17+ automatic JSX runtime (no React import).
    'plugin:react-hooks/recommended', // Rules of Hooks + exhaustive-deps defaults.
    'prettier', // Disable formatting rules handled by Prettier.
  ],

  // Register React and Hooks plugins used by `extends` and `rules`.
  plugins: ['react', 'react-hooks'],

  settings: {
    react: {
      // Auto-detect React version from installed `react` package.
      version: 'detect',
    },
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing in all files matched by this config chain.
    },
  },

  rules: reactRules,
};
