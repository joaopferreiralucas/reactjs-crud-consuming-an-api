module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'default-param-last': 'off',
  },
};
