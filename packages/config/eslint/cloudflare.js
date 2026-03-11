import baseConfig from './base.js';
import globals from 'globals';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.worker,
        ...globals.es2022,
      },
    },
    rules: {
      'unicorn/prefer-node-protocol': 'off',
    },
  },
];
