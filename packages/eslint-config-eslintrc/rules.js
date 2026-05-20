/**
 * Shared ESLint rule definitions for @hv/eslint-config-eslintrc (ESLint 8).
 *
 * Rule severity: 'off' | 'warn' | 'error'. Most rules use 'warn' for easier
 * adoption in large repos; fix or tighten per-repo over time.
 *
 * Aligned with @hv/eslint-config (flat) where the rule exists in both stacks.
 */

/** Core JavaScript rules applied in the base preset. */
const baseRules = {
  // Require braces for multi-line blocks; allow single-line if/else without braces.
  curly: ['warn', 'multi-line'],

  // Require `===` / `!==` except when comparing to `null` ('smart' allows `x == null`).
  eqeqeq: ['warn', 'smart'],

  // Discourage `console.log` left in production code (warnings only).
  'no-console': 'warn',

  // Discourage `debugger` statements (warnings only).
  'no-debugger': 'warn',

  // Discourage `var`; prefer `let` / `const`.
  'no-var': 'warn',

  // Prefer `const` when a variable is never reassigned.
  'prefer-const': 'warn',

  // Built-in unused variable check (TypeScript preset turns this off in favor of @typescript-eslint).
  'no-unused-vars': [
    'warn',
    {
      args: 'after-used', // Ignore unused args before the last used one.
      argsIgnorePattern: '^_', // Allow `_foo` unused parameters.
      caughtErrorsIgnorePattern: '^_', // Allow `catch (_err)`.
      varsIgnorePattern: '^_', // Allow `_unused` variables.
    },
  ],

  // Remove unused import statements (auto-fixable).
  'unused-imports/no-unused-imports': 'warn',

  // Mark unused variables that are not imports (complements no-unused-vars).
  'unused-imports/no-unused-vars': [
    'warn',
    {
      args: 'after-used',
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],

  // All `import` declarations must appear before other statements.
  'import/first': 'warn',

  // Require a blank line after the import block.
  'import/newline-after-import': 'warn',

  // Merge duplicate imports from the same module.
  'import/no-duplicates': 'warn',

  // Off: resolving paths needs project-specific resolver/tsconfig; enable per-repo if needed.
  'import/no-unresolved': 'off',
};

/** TypeScript-specific rules (ESLint 8 uses @typescript-eslint v5 rule names). */
const typescriptRules = {
  // Let @typescript-eslint handle unused vars for .ts files.
  'no-unused-vars': 'off',
  'unused-imports/no-unused-vars': 'off',

  // Control `// @ts-*` directives; allow ignore/expect-error only with a description.
  '@typescript-eslint/ban-ts-comment': [
    'warn',
    {
      'ts-check': false,
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': 'allow-with-description',
      'ts-nocheck': true, // Still warn on file-wide @ts-nocheck.
    },
  ],

  // Prefer `import type { Foo }` for type-only imports (smaller bundles).
  '@typescript-eslint/consistent-type-imports': [
    'warn',
    {
      prefer: 'type-imports',
    },
  ],

  // Warn on `any` to encourage stricter types over time.
  '@typescript-eslint/no-explicit-any': 'warn',

  // Warn on `foo!` non-null assertions.
  '@typescript-eslint/no-non-null-assertion': 'warn',

  // Discourage `require()` in TS files (use ESM import).
  '@typescript-eslint/no-var-requires': 'warn',

  // TypeScript-aware unused variables (replaces core `no-unused-vars` for .ts files).
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      args: 'after-used',
      argsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
};

/** React and React Hooks overrides on top of TypeScript preset. */
const reactRules = {
  // Off in TS projects: types replace PropTypes.
  'react/prop-types': 'off',

  // Off with React 17+ JSX transform: no need to `import React` in every file.
  'react/react-in-jsx-scope': 'off',

  // Off with automatic JSX runtime.
  'react/jsx-uses-react': 'off',

  // Warn when JSX identifiers are defined but marked unused by core rules.
  'react/jsx-uses-vars': 'warn',

  // Warn when hook dependency arrays are incomplete (common source of stale closures).
  'react-hooks/exhaustive-deps': 'warn',

  // Error: hooks must follow Rules of Hooks (invalid usage breaks at runtime).
  'react-hooks/rules-of-hooks': 'error',
};

/** Extra Next.js rule tweaks (most Next rules come from `next/core-web-vitals` extend). */
const nextRules = {
  // Prefer Next `<Link>` over `<a>` for internal routes (warn for gradual migration).
  '@next/next/no-html-link-for-pages': 'warn',
};

/**
 * Softer rules for legacy migrations. Extends the full `next` stack then relaxes
 * selected rules — not a different Node/ESLint version.
 */
const legacyRules = {
  // --- Base JS: turn off rules that create too much noise during migration ---
  curly: 'off', // Allow single-line bodies without braces enforcement.
  eqeqeq: 'off', // Allow `==` / `!=` in legacy code.
  'no-console': 'off', // Allow console logging in old apps.
  'no-var': 'off', // Allow `var` in legacy scripts.
  'prefer-const': 'off', // Do not force `const` rewrites yet.

  // --- TypeScript: relax strictness until types are improved incrementally ---
  '@typescript-eslint/ban-ts-comment': 'off', // Allow any `// @ts-*` without restrictions.
  '@typescript-eslint/no-explicit-any': 'off', // Allow `any` without warnings.
  '@typescript-eslint/no-non-null-assertion': 'off', // Allow `value!` assertions.
  '@typescript-eslint/no-var-requires': 'off', // Allow `require()` in TS files.

  // --- Imports: stop flagging duplicate/unused imports during large refactors ---
  'import/no-duplicates': 'off',
  'unused-imports/no-unused-imports': 'off',

  // --- React: reduce component/hook friction in old React codebases ---
  'react/display-name': 'off', // Do not require `displayName` on components.
  'react-hooks/exhaustive-deps': 'warn', // Keep as warn (not error) for effect deps.
};

/**
 * Glob patterns excluded from linting (build output, dependencies, caches).
 * Matched files are not parsed or reported by ESLint.
 */
const ignorePatterns = [
  '**/.next/**', // Next.js build output.
  '**/build/**', // Generic production build folders.
  '**/coverage/**', // Test coverage reports.
  '**/dist/**', // Bundler/library output (Vite, tsup, etc.).
  '**/node_modules/**', // Installed dependencies.
  '**/out/**', // Next.js static export / other `out` dirs.
  '**/.turbo/**', // Turborepo cache.
];

module.exports = {
  baseRules,
  typescriptRules,
  reactRules,
  nextRules,
  legacyRules,
  ignorePatterns,
};
