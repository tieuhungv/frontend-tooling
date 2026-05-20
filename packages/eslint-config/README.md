# @hv/eslint-config

Shared **ESLint 9 flat config** for HV frontend projects.

Use this package when the consumer repo runs **Node.js `>=18.18`** and **ESLint 9**
with `eslint.config.js`. For Node `12.22`–`17.x`, use
[`@hv/eslint-config-eslintrc`](../eslint-config-eslintrc) instead.

## Requirements

| Requirement | Value                                                      |
| ----------- | ---------------------------------------------------------- |
| Node.js     | `>=18.18.0`                                                |
| ESLint      | `>=9 <10` (peer)                                           |
| TypeScript  | `>=4.8.4 <6.1.0` if linting `.ts` / `.tsx` (optional peer) |
| Config file | `eslint.config.js` (CommonJS `require` + spread)           |

JavaScript-only repos do **not** need the `typescript` package installed.

## Install

```sh
yarn add -D eslint @hv/eslint-config
# if the repo has TypeScript sources:
yarn add -D typescript
```

Bundled dependencies (no need to install separately): `@eslint/js`, `typescript-eslint`,
`eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-import`,
`eslint-plugin-unused-imports`, `@next/eslint-plugin-next`, `eslint-config-prettier`.

## Presets

Pick **one** preset. Do not combine `react` and `next` — `next` already includes
React and TypeScript layers.

| Export                           | Stack                                       |
| -------------------------------- | ------------------------------------------- |
| `@hv/eslint-config` / `.../base` | JavaScript                                  |
| `.../typescript`                 | base + TypeScript                           |
| `.../react`                      | base + TypeScript + React + Hooks           |
| `.../next`                       | base + TypeScript + React + Hooks + Next.js |
| `.../legacy`                     | **next** + relaxed rules (migration only)   |

Rule details and comments: see source files in this package and
[`../eslint-config-eslintrc/rules.js`](../eslint-config-eslintrc/rules.js) (aligned
baseline for the eslintrc stack).

## Usage

### JavaScript

```js
const baseConfig = require('@hv/eslint-config');

module.exports = [...baseConfig];
```

### TypeScript

```js
module.exports = [...require('@hv/eslint-config/typescript')];
```

Non-type-checked `@typescript-eslint` recommended rules by default. For
type-aware rules, append a block with `parserOptions.project`:

```js
module.exports = [
  ...require('@hv/eslint-config/typescript'),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { project: './tsconfig.json' },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'warn',
    },
  },
];
```

### React (not Next.js)

```js
module.exports = [...require('@hv/eslint-config/react')];
```

Includes TypeScript + React recommended + JSX runtime + React Hooks.
`react-hooks/rules-of-hooks` stays **`error`**; most other plugin defaults are
downgraded to **`warn`** for easier adoption.

### Next.js

```js
module.exports = [...require('@hv/eslint-config/next')];
```

Adds `@next/eslint-plugin-next` (recommended + core-web-vitals), mostly as warnings.

### Legacy migration

```js
module.exports = [...require('@hv/eslint-config/legacy')];
```

Extends the full **next** preset, then disables or softens noisy rules. Still
requires Node 18+ and ESLint 9 — for older Node use
`@hv/eslint-config-eslintrc/legacy`.

Not for greenfield projects.

## Overrides

```js
module.exports = [
  ...require('@hv/eslint-config/next'),
  {
    files: ['src/generated/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'unused-imports/no-unused-imports': 'off',
    },
  },
];
```

Extra globals:

```js
module.exports = [
  ...require('@hv/eslint-config'),
  {
    languageOptions: {
      globals: { __APP_VERSION__: 'readonly' },
    },
  },
];
```

Extra ignores:

```js
module.exports = [
  ...require('@hv/eslint-config'),
  { ignores: ['.vercel/**', 'storybook-static/**'] },
];
```

## Prettier

Install and configure separately:

```js
// prettier.config.js
module.exports = require('@hv/prettier-config');
```

This package already applies `eslint-config-prettier` at the end of each preset.

## Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## CI

```sh
yarn eslint .
# migration: fail only on errors, allow warnings
yarn eslint . --quiet
```

## VSCode

```json
{
  "eslint.useFlatConfig": true,
  "prettier.requireConfig": true,
  "prettier.configPath": "./prettier.config.js",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```
