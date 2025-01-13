const { FlatCompat } = require('@eslint/eslintrc');
const baseConfig = require('../../.eslintrc.json');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: baseConfig,
});

module.exports = [...compat.config()];
