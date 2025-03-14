/* eslint-disable */
import eslint from '@eslint/js'
import allPrettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const {languageOptions: _, ...prettierRecommended} = allPrettierRecommended

export default tseslint.config(
  {
    ignores: ['../node_modules', '../dist', 'dependency-cruiser.cjs'],
  },

  {
    files: ['**/*.{ts,tsx}'],
  },

  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  eslintPluginUnicorn.configs['flat/recommended'],
  prettierRecommended,

  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],

  {
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
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
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
    },

    settings: {react: {version: '19.0'}},

    rules: {
      ...reactHooks.configs.recommended.rules,
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
)
