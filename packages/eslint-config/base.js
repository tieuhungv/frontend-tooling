const js = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const unusedImports = require('eslint-plugin-unused-imports');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

/**
 * Base JavaScript preset (ESLint 9 flat config).
 *
 * Consumer usage:
 *   const base = require('@tieuhungv/eslint-config');
 *   module.exports = [...base];
 *
 * Requires Node >= 18.18 and `eslint@9` in the consuming repo.
 */
module.exports = [
  {
    // Files/directories never linted (artifacts, deps, framework output).
    ignores: [
      '**/.next/**',
      '**/build/**',
      '**/coverage/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/out/**',
      '**/.turbo/**',
    ],
  },

  // ESLint core recommended rules (@eslint/js).
  js.configs.recommended,

  {
    // Apply the block below only to plain JavaScript/JSX (not .ts — see typescript preset).
    files: ['**/*.{js,cjs,mjs,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // `window`, `document`, etc.
        ...globals.node, // `process`, `__dirname` (in applicable files), etc.
        ...globals.es2024, // Modern built-ins (Set, Promise, etc.).
      },
    },

    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      // See packages/eslint-config-eslintrc/rules.js for detailed rule descriptions.
      curly: ['warn', 'multi-line'],
      eqeqeq: ['warn', 'smart'],
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',

      'no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      'import/first': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',
      'import/no-unresolved': 'off',
    },
  },

  // Disable stylistic ESLint rules that Prettier handles.
  prettierConfig,
];
