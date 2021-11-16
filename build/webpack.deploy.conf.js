'use strict';
const merge = require('webpack-merge');
const demoWebpackConfig = require('./webpack.demo.conf');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('../config');

const { publicPath } = config;

const deployWebpackConfig = merge(demoWebpackConfig, {
  mode: 'production',
  output: {
    filename: '[name].[hash].js',
    publicPath: publicPath,
  },
  devtool: false,
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        cache: false,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
      }),
    ],
  },
});

// remove vue loader plugin
deployWebpackConfig.plugins.filter((plugin) => {
  return !(plugin instanceof VueLoaderPlugin);
});

module.exports = deployWebpackConfig;
