module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },

  overrides: [
  ],

  parserOptions: {
    ecmaVersion: 'latest',
  },

  rules: {
    'quotes': ['error', 'single'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'semi': ['error', 'always']
  },
};
