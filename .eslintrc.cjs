module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js']
      }
    }
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'info', 'log'] }],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
      },
    ],
    // Disable for TS without a TS resolver; Node resolver still checks JS
    'import/no-unresolved': 'off',
    // Avoid false positives with type-only imports (e.g., from @playwright/test)
    'import/named': 'off',
  },
  overrides: [
    {
      files: ['tests/**/*.ts'],
      rules: {
        'no-empty-pattern': 'off',
      },
    },
  ],
  ignorePatterns: ['allure-report/', 'allure-results/', 'playwright-report/', 'test-results/'],
};
