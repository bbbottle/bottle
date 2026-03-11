import baseConfig from './base.js';
import globals from 'globals';

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'unicorn/prefer-top-level-await': 'error',
      'unicorn/no-process-exit': 'warn',
    },
  },
];
