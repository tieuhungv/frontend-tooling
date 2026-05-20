# @tieuhungv/eslint-config-eslintrc

Shared **ESLint 8** config for **`.eslintrc.cjs`** / **`.eslintrc.js`** on
**Node.js `>=12.22`**.

Use when the consumer repo cannot run ESLint 9 yet. When the repo reaches
**Node `>=18.18`**, migrate to [`@tieuhungv/eslint-config`](../eslint-config) (flat config)
for newer plugins and long-term support.

## Requirements

| Requirement | Value                                                   |
| ----------- | ------------------------------------------------------- |
| Node.js     | `>=12.22.0` (ESLint 8 does not support Node 12.0–12.21) |
| ESLint      | `^8.57.0` (peer)                                        |
| TypeScript  | `>=4.3.5 <6` if linting `.ts` / `.tsx` (optional peer)  |
| Config file | `.eslintrc.cjs` recommended (CommonJS)                  |

## Install

```sh
yarn add -D eslint@8 @tieuhungv/eslint-config-eslintrc
```

With TypeScript sources:

```sh
yarn add -D eslint@8 typescript @tieuhungv/eslint-config-eslintrc
```

Bundled: `@typescript-eslint/eslint-plugin` / `parser` v5, `eslint-plugin-react`,
`eslint-plugin-react-hooks` v4, `eslint-plugin-import`, `eslint-plugin-unused-imports` v3,
`eslint-config-next` v13, `eslint-config-prettier`.

## Presets

Use **one** `extends` entry. Do not list both `react` and `next`.

| `extends`                           | Includes                          |
| ----------------------------------- | --------------------------------- |
| `@tieuhungv/eslint-config-eslintrc` | JavaScript (base)                 |
| `.../typescript`                    | base + TypeScript                 |
| `.../react`                         | base + TypeScript + React + Hooks |
| `.../next`                          | above + `next/core-web-vitals`    |
| `.../legacy`                        | **next** + relaxed rules          |

Per-rule comments: [`rules.js`](./rules.js).

## Usage

### JavaScript

```js
// .eslintrc.cjs
module.exports = {
  extends: ['@tieuhungv/eslint-config-eslintrc'],
};
```

### TypeScript

```js
module.exports = {
  extends: ['@tieuhungv/eslint-config-eslintrc/typescript'],
};
```

### React (not Next.js)

```js
module.exports = {
  extends: ['@tieuhungv/eslint-config-eslintrc/react'],
};
```

### Next.js (+ TypeScript + React)

```js
module.exports = {
  extends: ['@tieuhungv/eslint-config-eslintrc/next'],
};
```

### Legacy migration

```js
module.exports = {
  extends: ['@tieuhungv/eslint-config-eslintrc/legacy'],
};
```

Extends the full **next** chain, then turns off selected rules (see `legacyRules` in
[`rules.js`](./rules.js)). Still ESLint 8 on Node 12.22+ — not a different ESLint
major version.

## Scripts

ESLint 8 often needs explicit extensions:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix"
  }
}
```

## Overrides

```js
module.exports = {
  extends: ['@tieuhungv/eslint-config-eslintrc/react'],
  rules: {
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['src/generated/**'],
      rules: { '@typescript-eslint/no-explicit-any': 'off' },
    },
  ],
};
```

## Prettier

```sh
# Node 12.22+
yarn add -D prettier@2 @tieuhungv/prettier-config
```

```js
// prettier.config.js
module.exports = require('@tieuhungv/prettier-config');
```

## Comparison with `@tieuhungv/eslint-config`

|                     | `@tieuhungv/eslint-config-eslintrc` | `@tieuhungv/eslint-config` |
| ------------------- | ----------------------------------- | -------------------------- |
| ESLint              | 8                                   | 9                          |
| Config              | `.eslintrc.cjs`                     | `eslint.config.js`         |
| Min Node            | 12.22                               | 18.18                      |
| TypeScript ESLint   | v5 (`@typescript-eslint/*`)         | v8 (`typescript-eslint`)   |
| Next.js integration | `eslint-config-next@13`             | `@next/eslint-plugin-next` |

Rule intent is aligned between both packages to simplify Node/ESLint upgrades.

## CI

```sh
yarn eslint . --ext .js,.jsx,.ts,.tsx
```

Use `--max-warnings 0` when the baseline is clean; during migration, fail on errors
only and fix warnings over time.

## VSCode

For eslintrc projects, **do not** set `eslint.useFlatConfig`. Example:

```json
{
  "prettier.requireConfig": true,
  "prettier.configPath": "./prettier.config.js",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```
