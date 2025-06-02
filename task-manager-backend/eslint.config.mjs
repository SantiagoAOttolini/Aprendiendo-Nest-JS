// @ts-check
import eslint from '@eslint/js';

export default [
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
];