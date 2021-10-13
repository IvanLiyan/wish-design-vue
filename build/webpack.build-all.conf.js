'use strict';
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');

module.exports = merge(baseWebpackConfig, {
  entry: './src/index.js',
  output: {
    filename: `index.js`,
    libraryTarget: 'umd'
  }
});
