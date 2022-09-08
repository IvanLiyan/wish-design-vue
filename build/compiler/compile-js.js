const babel = require('babel-core');
const fs = require('fs');
const path = require('path');
const { writeFile } = require('./output');

// function resolve (dir) {
//   return path.join(__dirname, '../..', dir);
// }

// https://regexr.com/47jlq
const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

function matchImports(code) {
  return code.match(IMPORT_RE) || [];
}

// "import App from 'App.vue';" => "import App from 'App.xxx';"
function replaceScriptImportExt(code, from, to) {
  const importLines = matchImports(code);

  importLines.forEach((importLine) => {
    const result = importLine.replace(from, to);
    code = code.replace(importLine, result);
  });

  return code;
}

function compileJs(filePath, file, option) {
  let code = fs.readFileSync(filePath, { encoding: 'utf-8' });

  code = replaceScriptImportExt(code, '.vue', '');
  code = replaceScriptImportExt(code, '@/', '@ContextLogic/wt-vue/es/');
  code = replaceScriptImportExt(code, '@components', '@ContextLogic/wt-vue/es/components');

  const result = babel.transform(code, {
    filename: filePath,
    extends: path.join(__dirname, '../../.babelrc'),
  });
  writeFile(file, result.code, option);
}
module.exports = compileJs;
