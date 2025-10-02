import * as eslint from '@eslint/js'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import * as react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import * as globals from 'globals'
import {defineConfig, globalIgnores} from 'eslint/config'
import tslint from 'typescript-eslint'
import sonarjs from 'eslint-plugin-sonarjs'

const config = defineConfig(
  globalIgnores([
    '../node_modules',
    '../dist',
    './dependency-cruiser.cjs',
    '../storybook_static',
  ]),

  eslint.configs.recommended,
  ...tslint.configs.recommended,
  eslint.configs.recommended,
  tslint.configs.strictTypeChecked,
  eslintPluginUnicorn.configs.recommended,
  sonarjs.configs.recommended,
  prettierRecommended,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        ecmaVersion: 'latest',
        tsconfigRootDir: import.meta.dirname + '/..',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.vitest,
      },
    },
  },

  {
    ...react.configs.flat['jsx-runtime'],
    ...react.configs.flat['recommended'],
    settings: {react: {version: '19.0'}},
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    files: ['../**/*.test.ts', '../**/*.test-d.ts'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.vitest,
      },
    },
  },
)

export default config
