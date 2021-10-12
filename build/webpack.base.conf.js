'use strict';
const path = require('path');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const { pkgName, fullName, isTest, isProd } = config;
module.exports = {
  context: resolve(''),
  stats: 'errors-warnings',
  mode: 'none',
  output: {
    path: resolve('lib'),
    filename: '[name].js',
    publicPath: '/',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'components': resolve('components'),
      '@components': resolve('components'),
      '@dependence': resolve('dependence'),
      '@test': resolve('test/unit'),
      '@examples': resolve('examples'),
      [fullName]: resolve(''),
      [pkgName]: resolve('')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
          }
        }],
        enforce: 'pre',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('components'),
          resolve('examples')
        ],
      },
      {
        test: /\.vue$/,
        use: isTest ? 
        [{
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              // whitespace: 'condense',
              // preserveWhitespace: false,
            },
          },
        }] 
        : 
        [{
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              whitespace: 'condense',
              preserveWhitespace: false,
            },
          },
        },
        path.join(resolve('dependence/vue-source-doc-loader/index.js')),
        ],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [
          resolve('src'),
          resolve('test'),
          resolve('examples'),
          resolve('components'),
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
            esModule: false,
            name: 'img/[name].[hash:7].[ext]'
          },
        }],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
            esModule: false,
            name: 'media/[name].[hash:7].[ext]'
          },
        }],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
            esModule: false,
            name: 'fonts/[name].[hash:7].[ext]'
          },
        }],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: resolve('.postcssrc.js')
            }
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }],
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: resolve('.postcssrc.js')
            }
          }
        }],
      }
    ]
  },
  externals: {
    vue: 'vue'
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: '127.0.0.1',
    port: config.port,
    open: false,
    publicPath: '/'
    
  }
};
