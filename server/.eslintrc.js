module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-restricted-syntax': 0,
    'o-case-declarations': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'no-unused-vars': 0,
    'linebreak-style': 0,
    camelcase: 0,
  },
};
