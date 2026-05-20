# @tieuhungv/prettier-config

Shared [Prettier](https://prettier.io/) options for HV frontend projects.

This package exports a plain JavaScript object. Consuming repos load it from
`prettier.config.js` so formatting stays consistent across JavaScript, TypeScript,
React, and Next.js codebases.

## Requirements

| Requirement   | Value                               |
| ------------- | ----------------------------------- |
| Node.js       | `>=12.22.0` (package `engines`)     |
| Prettier      | `>=2 <4` (peer dependency)          |
| Config format | CommonJS, e.g. `prettier.config.js` |

The config object itself does not run Node-specific logic. The **Prettier version**
you install in the consumer repo determines the minimum Node version:

| Consumer Node | Recommended Prettier                        |
| ------------- | ------------------------------------------- |
| `12.22+`      | `prettier@2` (Prettier 3 needs Node `>=14`) |
| `14+`         | `prettier@3`                                |

## Install

```sh
# Node 12.22+
yarn add -D prettier@2 @tieuhungv/prettier-config

# Node 14+
yarn add -D prettier@3 @tieuhungv/prettier-config
```

Pair with ESLint on older Node using
[`@tieuhungv/eslint-config-eslintrc`](../eslint-config-eslintrc) and `eslint@8`.

## Usage

```js
// prettier.config.js
module.exports = require('@tieuhungv/prettier-config');
```

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Exports

| Import                              | Description                                                   |
| ----------------------------------- | ------------------------------------------------------------- |
| `@tieuhungv/prettier-config`        | Default options ([`index.js`](./index.js))                    |
| `@tieuhungv/prettier-config/legacy` | Default + `trailingComma: 'es5'` ([`legacy.js`](./legacy.js)) |

### Default options (summary)

See inline comments in [`index.js`](./index.js) for each option.

| Option           | Value   | Summary                                |
| ---------------- | ------- | -------------------------------------- |
| `semi`           | `true`  | Semicolons at end of statements        |
| `singleQuote`    | `true`  | Single quotes in JS/TS                 |
| `jsxSingleQuote` | `false` | Double quotes in JSX attributes        |
| `trailingComma`  | `'all'` | Trailing commas wherever valid in ES5+ |
| `printWidth`     | `100`   | Wrap line length                       |
| `tabWidth`       | `2`     | Spaces per indent                      |
| `useTabs`        | `false` | Spaces, not tabs                       |
| `endOfLine`      | `'lf'`  | Unix line endings for git              |

### Legacy profile

```js
module.exports = require('@tieuhungv/prettier-config/legacy');
```

Only changes `trailingComma` to `'es5'` (no trailing comma after function parameters).
Use this to reduce formatting diff when migrating older code — **not** tied to
Node 12 vs 18.

## Repo-level overrides

```js
const prettierConfig = require('@tieuhungv/prettier-config');

module.exports = {
  ...prettierConfig,
  printWidth: 120,
};
```

Prefer updating this package if a change should apply to many repos.

## VSCode

```json
{
  "prettier.requireConfig": true,
  "prettier.configPath": "./prettier.config.js",
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## CI

```sh
yarn prettier --check .
# or
yarn format:check
```
