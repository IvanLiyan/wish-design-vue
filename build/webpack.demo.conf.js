'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config');

const md = require('markdown-it')();
const { isProd, publicPath } = config;

function wrap (render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
}

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

function attrRemove (token, attrName) {
  const index = token.attrIndex(attrName);
  if (index > -1) {
    token.attrs.splice(index, 1);
  }
  return token;
}

const overrideEntryConfig = Object.assign({}, baseWebpackConfig, {
  entry: {
    docs: resolve('examples/index.js')
  },
  externals: {}
});

const resolveMds = {};

const port = process.env.PORT || config.port;
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isProd ? '"production"' : '"development"',
      DEPLOY_ENV: `"${process.env.DEPLOY_ENV}"` || '"development"',
    },
    BASE_URL: `"${publicPath}"`,
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    template: resolve('examples/index.html'),
    chunksSortMode: 'dependency',
    inject: true,
    minify: {
      collapseWhitespace: true
    }
  }),
  // copy ico
  new CopyWebpackPlugin([
    {
      from: resolve('examples/assets/favicon.png'),
      to: resolve('dist'),
      ignore: ['.*']
    },
  ]),
  new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`Your application is running here: http://0.0.0.0:${port}`]
    },
    onErrors: utils.createNotifierCallback()
  })
]

const demoWebpackConfig = merge(overrideEntryConfig, {
  mode: 'development',
  output: {
    path: resolve('dist'),
    filename: '[name].[hash:7].js'
  },
  devtool: false,
  devServer: {
    port,
  },
  module: {
    rules: [
    {
      test: /\.md$/,
      use: [{
        loader: 'vue-loader'
      }, {
        loader: 'vue-markdown-loader/lib/markdown-compiler',
        options: {
          raw: true,
          preventExtract: true,
          use: [
            [require('markdown-it-anchor'), {
              level: [2, 3],
              permalink: true,
              permalinkBefore: false,
              permalinkSymbol: '#',
              permalinkClass: 'anchor'
            }],
            [require('markdown-it-container'), 'demo', {
              validate (params) {
                return params.trim().match(/^demo\s*(.*)$/);
              },
              render (tokens, idx) {
                const token = tokens[idx];
                const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/) || '';
                const description = (m && m.length > 1) ? m[1] : '';
                const descriptionHTML = description ? md.render(description) : '';
                if (token.nesting === 1) {
                  const content = tokens[idx + 1].content;
                  return `<demo-block>
                      <div slot='source' class='source'>${content}</div>
                      ${descriptionHTML}
                      <div slot='highlight' class='highlight'>
                  `;
                }
                return '</div></demo-block>\n';
              },
            }],
            [require('markdown-it-container'), 'include', {
              validate: function validate(params) {
                return params.trim().match(/^include\s*(.*)$/);
              },

              render: function render(tokens, idx) {
                const curToken = tokens[idx];
                const m = curToken.info.trim();
                const paramText = m.match(/^include\s*\(([^()]*?)\)/) || '';
                if (curToken.nesting === 1) {
                  let description = '';
                  let params = {};
                  if (paramText && paramText.length > 1) {
                    params = parseRef(paramText);
                  }

                  let content = tokens[idx + 1].content;

                  if (params.src) {
                    const mdcname = getComponentName(params.src);
                    return `<${mdcname}></${mdcname}>`;
                  } else {
                    throw new Error('include container must has src param');
                  }
                }
                return '</div></demo-block>\n';
              },
            }],
          ],
          preprocess: function preprocess(MarkdownIt, source) {
            MarkdownIt.renderer.rules.table_open = () => '<table class="table">';
            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
            MarkdownIt.renderer.rules.link_open = function (tokens, idx, options, env, self) {
              const token = tokens[idx];
              const href = token.attrGet('href');
              if (/^[http|https]/.test(href) || /^\/\//.test(href)) {
                // abs path
                token.attrPush(['target', '_blank'])
              } else if (/^\//.test(href)) {
                // relative path
                attrRemove(token, 'href');
                token.attrPush(['to', href]);
                token.tag = 'router-link';
              } else if (/^#/.test(href)) {
                // anchor
                attrRemove(token, 'href');
                token.attrPush([':to', `{ ...$route, hash: "${href}" }`]);
                token.tag = 'router-link';
              }
              return self.renderToken(tokens, idx, options);
            }
            // MarkdownIt.renderer.rules.link_close = function (tokens, idx, options, env, self) {

            // }
            const resourcePath = this.resourcePath;
            if (resolveMds[resourcePath]) {
              return source;
            }
            const filePath = resourcePath.replace(/\/?[^/]*$/, '');
            const matches = source.match(/:::\s*include\s*\(([^()]*?)\)[\s\S]*?:::/g) || '';
            const scripts = [];
            const components = [];
            if (matches) {
              matches.forEach((match, index) => {
                const _match = match.match(/:::\s*include\s*\(([^()]*?)\)/) || '';
                const params = parseRef(_match);
                if (params.src) {
                  const mdcname = getComponentName(params.src);
                  const mdpath = path.join(filePath, params.src);
                  resolveMds[mdpath] = true;
                  source = source.replace(match, match.replace(/(:::\s*include\s*\(([^()]*?)\)[\s\S]*?)(:::)/, function (s, a, b ,c) {
                    return a.replace(b, `${b} resolve="${mdpath}"`) + c;
                  }));
                  scripts.push(`import ${mdcname} from "${path.join(filePath, params.src)}"`);
                  components.push(mdcname);
                }
              })
            }

            source =
              (scripts.length ?
              `<script>
                ${scripts.join('\n')};
                export default {
                  components: {${components.length && components.join(',')}},
                }
              </script>\n` : '') + source;
            return source;
          },
        },
      }]
    }],
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        components: {
          // test: /(\/src\/|\/components\/)[^demo]*\.(js|vue)$/,
          test (module) {
            const reg = /(\/src\/|\/components\/).*\.(js|vue)/
            let r = reg.test(module.resource);
            if (!r) { return false }
            return !/(doc|demo|\.json)/.test(module.resource);
          },
          name: 'mtd-vue',
          chunks: 'all'
        },
      },
    },
  },
  plugins: plugins,
});

module.exports = demoWebpackConfig;

function getComponentName (path) {
  const pathName = path.replace(/\.[a-z]+$/, '') // 移除后缀
    .match(/\w+/g).join('-');
  if (!pathName.includes('demo')) {
    return camelCase(`demo-${pathName}`);
  }
  return camelCase(pathName);
}

function camelCase(str){
  let strArr = str.split('-');
  for(let i = 1; i < strArr.length; i++){
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
  }
  strArr = strArr.join('').split('/');
  for(let i = 1; i < strArr.length; i++){
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
  }
  return strArr.join('');
}

function parseRef(str) {
  const result = str[1].match(/([@_a-zA-Z]+)(\s+|=|$)("[^"]+"*|\d+|true|false)?/g);
  const ret = {};
  if (result.length) {
    result.forEach((item) => {
      const r = item.split('=');
      ret[r[0]] = r.length > 1 ? eval(r[1]) : true;
    })
  }
  return ret;
}
