module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:n8n-nodes-base/nodes',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'n8n-nodes-base/node-param-default-missing': 'error',
    'n8n-nodes-base/node-param-description-missing-from-dynamic-multi-options': 'error',
    'n8n-nodes-base/node-param-description-missing-from-dynamic-options': 'error',
    'n8n-nodes-base/node-param-description-missing-from-multi-options': 'error',
    'n8n-nodes-base/node-param-description-missing-from-options': 'error',
    'n8n-nodes-base/node-param-description-unneeded-backticks': 'error',
    'n8n-nodes-base/node-param-description-weak': 'error',
    'n8n-nodes-base/node-param-display-name-miscased': 'error',
    'n8n-nodes-base/node-param-display-name-untrimmed': 'error',
    'n8n-nodes-base/node-param-options-type-unsorted-items': 'error',
    'n8n-nodes-base/node-param-resource-without-no-data-expression': 'error',
  },
};
