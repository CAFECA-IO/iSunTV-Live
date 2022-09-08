module.exports = {
  parserOptions: {
    ecmaVersion: 2019, // 支援 ECMAScript2019
    sourceType: 'module', // 使用 ECMAScript ****module
    ecmaFeatures: {
      jsx: true, // 支援 JSX
      experimentalObjectRestSpread: true,
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  // 加上 ts 相關規則
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              '{}': false,
            },
          },
        ],
      },
    },
  ],
  extends: ['plugin:import/errors', 'plugin:import/typescript'],
  // 整合 prettier 和解決 prettier 衝突問題
  plugins: ['prettier'],
};
