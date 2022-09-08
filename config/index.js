const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  namespace: 'wt',
  pkgName: 'wt-vue', // 包名改动可能需要手动更改代码中 import 的包名
  fullName: '@ContextLogic/wt-vue',
  port: 8081,
  themes: ['theme'],
  isProd: isProd,
  isTest: process.env.BABEL_ENV === 'test',
  publicPath: isProd ? '/' : '/',
};
