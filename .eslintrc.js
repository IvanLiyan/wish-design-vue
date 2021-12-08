// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    mocha: true,
    node: true,
  },
  globals: {
    expect: false,
    should: false,
    sinon: false,
    BASE_URL: false,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'],
    // allow async-await
    'generator-star-spacing': 'off',
    'prefer-promise-reject-errors': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [2, 300, 2],
    'vue/max-attributes-per-line': 'off',
    'vue/html-indent': 'off',
    'vue/require-default-prop': 'off',
    'vue/order-in-components': 2,
    'vue/this-in-template': [2, 'never'],
    'prefer-const': 2,
    'comma-dangle': ['error', 'always-multiline'],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/html-closing-bracket-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-template-shadow': 'off',
    'vue/no-unused-components': 'off',
    'template-curly-spacing': 'off',
    'vue/require-prop-types': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    'standard/no-callback-literal': 'off',
    'space-before-function-paren': 0,
  },
};
