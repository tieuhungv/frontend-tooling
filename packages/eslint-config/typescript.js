const baseConfig = require('./base');
const prettierConfig = require('eslint-config-prettier');
const tseslint = require('typescript-eslint');

/**
 * TypeScript preset (ESLint 9 flat config).
 *
 * Extends: base + typescript-eslint recommended (non-type-checked).
 * For type-aware rules, append a consumer block with `parserOptions.project`.
 *
 * Consumer usage:
 *   module.exports = [...require('@tieuhungv/eslint-config/typescript')];
 */
module.exports = [
  ...baseConfig,

  // @typescript-eslint flat recommended rules (no type information required).
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx,mts,cts}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      // Hand off unused checks to TypeScript-aware rules below.
      'no-unused-vars': 'off',
      'unused-imports/no-unused-vars': 'off',

      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          minimumDescriptionLength: 3,
          'ts-check': false,
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': true,
        },
      ],

      // `import type` for type-only imports.
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],

      // Off: `{}` as a type is still common in utility types / libs.
      '@typescript-eslint/no-empty-object-type': 'off',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  prettierConfig,
];
