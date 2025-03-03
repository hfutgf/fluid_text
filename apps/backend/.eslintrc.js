import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'error',
    },
    ignores: [
      '.eslintrc.js',
      'package.json',
      'tsconfig.json',
      'node_modules',
      'dist',
    ],
  },
];
