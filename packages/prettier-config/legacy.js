const defaultConfig = require('./index');

/**
 * Legacy Prettier profile: same as default except trailing commas.
 *
 * `trailingComma: 'es5'` only adds trailing commas where valid in ES5
 * (objects/arrays), not after function parameters. Produces smaller diffs when
 * migrating older codebases that are not ready for `trailingComma: 'all'`.
 */
module.exports = {
  ...defaultConfig,

  // ES5-safe trailing commas only (no trailing comma after last function argument).
  trailingComma: 'es5',
};
