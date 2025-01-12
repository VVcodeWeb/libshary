const cypress = require('eslint-plugin-cypress/flat');

module.exports = [
  cypress.configs['recommended'],
  {
    extends: '../../.eslintrc.json',
    rules: {},
  },
];
