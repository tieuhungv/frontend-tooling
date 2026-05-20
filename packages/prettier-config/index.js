/**
 * Default Prettier options for HV frontend repositories.
 *
 * Prettier owns formatting; ESLint should not enforce style rules that conflict
 * with these settings (use eslint-config-prettier in ESLint packages).
 *
 * @see https://prettier.io/docs/en/options.html
 */
module.exports = {
  // Print semicolons at the end of statements (e.g. `const x = 1;`).
  semi: true,

  // Use single quotes in JS/TS instead of double quotes (JSX still uses double by default).
  singleQuote: true,

  // When true, also use single quotes in JSX attributes. `false` keeps JSX as className="foo".
  jsxSingleQuote: false,

  // Trailing commas wherever valid in ES5+ (objects, arrays, function params, etc.).
  trailingComma: 'all',

  // Soft-wrap lines longer than this column count.
  printWidth: 100,

  // Spaces per indentation level.
  tabWidth: 2,

  // Indent with spaces (`false`) instead of tab characters (`true`).
  useTabs: false,

  // Print spaces between brackets in object literals: `{ foo: bar }` vs `{foo: bar}`.
  bracketSpacing: true,

  // Put `>` of a multi-line JSX element on the next line (`false`) or at the end of the last prop line (`true`).
  bracketSameLine: false,

  // Always include parentheses around a sole arrow-function parameter: `(x) => x`.
  arrowParens: 'always',

  // Line endings: `lf` (Unix) for consistent diffs across OSes in git.
  endOfLine: 'lf',

  // Quote object keys only when required (`as-needed`) vs always (`consistent`).
  quoteProps: 'as-needed',

  // How to wrap prose in markdown: `preserve` leaves reflow to authors/editors.
  proseWrap: 'preserve',

  // Respect CSS display for HTML whitespace (recommended for React/HTML).
  htmlWhitespaceSensitivity: 'css',

  // Format quoted strings that embed other languages (e.g. CSS-in-JS, GraphQL).
  embeddedLanguageFormatting: 'auto',
};
