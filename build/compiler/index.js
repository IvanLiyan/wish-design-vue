const glob = require("glob")
const path = require('path')
const compileJs = require('./compile-js');
const compileSfc = require('./compile-sfc');
const { writeFile, copyFile, ROOT } = require('./output');
const fs = require('fs');

// const sep = path.sep;
function resolve (dir) {
  return path.join(__dirname, '../..', dir);
}

const SFC_REGEXP = /\.(vue)$/;
const JS_REGEXP = /\.(js)$/;
// const DEMO_REGEXP = new RegExp('\\' + sep + 'demo$');
// const TEST_REGEXP = new RegExp('\\' + sep + 'test$');

function isSFC (filePath) {
  return SFC_REGEXP.test(filePath);
}

function isJS (filePath) {
  return JS_REGEXP.test(filePath);
}

function isSkipFile (filePath, file) {
  return /theme/.test(filePath);
}

function compileFile (filePath, file) {
  if (isSkipFile(filePath, file)) {
    return;
  } else if (isSFC(filePath)) {
    return compileSfc(filePath, file)
  } else if (isJS(filePath)) {
    return compileJs(filePath, file)
  } else {
    copyFile(filePath, file)
    console.log(filePath);
  }
}

glob('./components/**/!(doc|tests)/*.!(scss|md|json)', function (er, files) {
  if (er) {
    console.error(er);
    throw er;
  }
  files.forEach((file) => {
    const filePath = resolve(file);
    return compileFile(filePath, file);
  })
});

glob('./src/**/*.@(vue|js)', function (er, files) {
  if (er) {
    console.error(er);
    throw er;
  }
  files.forEach((file) => {
    const filePath = resolve(file);
    const f = file.replace('src/', '');
    compileFile(filePath, f);
    if (f === './index.js') {
      let code = fs.readFileSync(path.join(`${ROOT}`, 'index.js'), { encoding: 'utf-8' });
      code = code.replace(/'components/g, '\'./components');
      return writeFile(f, code);
    }
  })
});
