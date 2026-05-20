# Frontend Tooling

Monorepo of shared **Prettier** and **ESLint** configs for HV frontend repositories
(JavaScript, TypeScript, React, and Next.js).

Centralizing formatting and lint rules keeps behavior consistent across many repos,
reduces duplicated setup, and lets you improve standards in one place. Each package
is modular: pick the closest preset, then add **narrow, repo-level overrides** only
where needed.

## Packages

| Package                                                                 | Purpose                  | Config file          | Node (consumer repo)               |
| ----------------------------------------------------------------------- | ------------------------ | -------------------- | ---------------------------------- |
| [`@hungvong/prettier-config`](./packages/prettier-config)               | Formatting rules         | `prettier.config.js` | `>=12.22` (use Prettier 2 on 12.x) |
| [`@hungvong/eslint-config`](./packages/eslint-config)                   | ESLint 9 **flat** config | `eslint.config.js`   | `>=18.18`                          |
| [`@hungvong/eslint-config-eslintrc`](./packages/eslint-config-eslintrc) | ESLint 8 **eslintrc**    | `.eslintrc.cjs`      | `>=12.22`                          |

```text
frontend-tooling/
  packages/
    prettier-config/
    eslint-config/           # ESLint 9 — modern repos
    eslint-config-eslintrc/  # ESLint 8 — Node 12–17 repos
```

**Prettier vs ESLint:** Prettier owns formatting. ESLint focuses on correctness,
imports, unused code, React/Next conventions. Both ESLint packages include
`eslint-config-prettier` so style rules do not fight Prettier.

## Choosing ESLint package

| Your repo                     | Install                            | Extend / require                                                                                   |
| ----------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| Node `>=18.18`, ESLint 9      | `@hungvong/eslint-config`          | `eslint.config.js` — see [eslint-config README](./packages/eslint-config/README.md)                |
| Node `12.22`–`17.x`, ESLint 8 | `@hungvong/eslint-config-eslintrc` | `.eslintrc.cjs` — see [eslint-config-eslintrc README](./packages/eslint-config-eslintrc/README.md) |

Do **not** install both ESLint packages in one repo. Pick one stack based on Node
and ESLint version.

## Preset inheritance (pick one leaf preset)

You only need **one** preset per repo. Higher presets include lower layers.

### ESLint 9 (`@hungvong/eslint-config`)

```text
base  →  typescript  →  react  →  next  →  legacy
         (JS only)      (+TS)    (+React) (+Next) (softer rules)
```

| Preset                                 | Use for                                                 |
| -------------------------------------- | ------------------------------------------------------- |
| `@hungvong/eslint-config` / `.../base` | JavaScript only                                         |
| `.../typescript`                       | TypeScript (no React)                                   |
| `.../react`                            | React + TypeScript (not Next.js)                        |
| `.../next`                             | **Next.js** (includes React + TS)                       |
| `.../legacy`                           | Large old codebase; extends **next** with relaxed rules |

### ESLint 8 (`@hungvong/eslint-config-eslintrc`)

Same idea via `extends`:

| Preset                             | Use for                          |
| ---------------------------------- | -------------------------------- |
| `@hungvong/eslint-config-eslintrc` | JavaScript only                  |
| `.../typescript`                   | TypeScript (no React)            |
| `.../react`                        | React + TypeScript (not Next.js) |
| `.../next`                         | **Next.js**                      |
| `.../legacy`                       | Softer rules; extends **next**   |

**Do not** combine `react` + `next` — use `next` alone for Next.js apps.

## Quick start

### Modern repo (Node 18+, ESLint 9)

```sh
yarn add -D eslint prettier@3 @hungvong/eslint-config @hungvong/prettier-config
# If the repo has .ts / .tsx files:
yarn add -D typescript
```

```js
// prettier.config.js
module.exports = require('@hungvong/prettier-config');
```

```js
// eslint.config.js — example: Next.js
const nextConfig = require('@hungvong/eslint-config/next');

module.exports = [...nextConfig];
```

### Legacy repo (Node 12.22+, ESLint 8)

```sh
yarn add -D eslint@8 prettier@2 @hungvong/eslint-config-eslintrc @hungvong/prettier-config
yarn add -D typescript   # if using .ts / .tsx
```

```js
// prettier.config.js
module.exports = require('@hungvong/prettier-config');
```

```js
// .eslintrc.cjs — example: Next.js + TypeScript
module.exports = {
  extends: ['@hungvong/eslint-config-eslintrc/next'],
};
```

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "format:check": "prettier --check ."
  }
}
```

## GitHub Packages

Packages are published under scope **`@hungvong`** to
[GitHub Packages](https://github.com/tieuhungv/frontend-tooling/packages).

### Install in another repo

1. Create a [GitHub PAT](https://github.com/settings/tokens) with `read:packages`.
2. Add `.npmrc` (see [`.npmrc.example`](./.npmrc.example)):

```ini
@hungvong:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

3. Install:

```sh
export GITHUB_TOKEN=ghp_...
yarn add -D @hungvong/prettier-config @hungvong/eslint-config
```

### Publish from this monorepo

1. PAT needs `write:packages` and `read:packages`.
2. Copy `.npmrc.example` → `.npmrc` and set `GITHUB_TOKEN`.
3. Bump `version` in each `packages/*/package.json`, then:

```sh
yarn publish:packages
```

Or publish one package: `npm publish -w packages/prettier-config`.

## Repo-level overrides

Append overrides **after** the shared config so exceptions stay visible:

```js
// eslint.config.js (flat)
const nextConfig = require('@hungvong/eslint-config/next');

module.exports = [
  ...nextConfig,
  {
    files: ['src/generated/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
```

```js
// .eslintrc.cjs (ESLint 8)
module.exports = {
  extends: ['@hungvong/eslint-config-eslintrc/next'],
  overrides: [
    {
      files: ['src/generated/**'],
      rules: { '@typescript-eslint/no-explicit-any': 'off' },
    },
  ],
};
```

## CI

Run format and lint separately:

```sh
yarn prettier --check .
yarn eslint .
```

For large migrations, allow warnings in CI first, then tighten rules to `error`
per repo once the baseline is clean. ESLint 8 repos often need `--ext .js,.jsx,.ts,.tsx`.

## VSCode

```json
{
  "prettier.requireConfig": true,
  "prettier.configPath": "./prettier.config.js",
  "eslint.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

Use `"eslint.useFlatConfig": true` only when the repo uses `eslint.config.js`
(`@hungvong/eslint-config`). For `.eslintrc.cjs`, omit that setting.

## Developing this monorepo

Requires **Node `>=18.18`** (see root `package.json` `engines`).

```sh
yarn install
yarn format:check
yarn lint
```

To publish all workspace packages to GitHub Packages, configure `.npmrc` (from
[`.npmrc.example`](./.npmrc.example)) and run `yarn publish:packages`.

Package-specific details: [prettier-config](./packages/prettier-config/README.md) ·
[eslint-config](./packages/eslint-config/README.md) ·
[eslint-config-eslintrc](./packages/eslint-config-eslintrc/README.md).
