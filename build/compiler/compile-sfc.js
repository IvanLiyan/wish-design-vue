const compiler = require('vue-template-compiler');
const compileUtils = require('@vue/component-compiler-utils');
const compileJs = require('./compile-js');
const fs = require('fs');
const path = require('path');
const { writeFile } = require('./output');

const RENDER_FN = '__vue_render__';
const STATIC_RENDER_FN = '__vue_staticRenderFns__';
const EXPORT = 'export default {';

function trim(code) {
  return code.replace(/\/\/\n/g, '').trim();
}


// inject render fn to script
function injectRender(script, render) {
  script = trim(script);

  render = render
    .replace('var render', `var ${RENDER_FN}`)
    .replace('var staticRenderFns', `var ${STATIC_RENDER_FN}`);

  return script.replace(
    EXPORT,
    `${render}\n${EXPORT}\n  render: ${RENDER_FN},\n\n  staticRenderFns: ${STATIC_RENDER_FN},\n`
  );
}

function compileTemplate(template) {
  const result = compileUtils.compileTemplate({
    compiler,
    source: template,
    isProduction: true,
  });

  return result.code;
}

function compileSfc (filePath, file) {
  const source = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const descriptor =  compileUtils.parse({
    source,
    compiler,
    needMap: false,
  });
  const { template } = descriptor;
  let script = descriptor.script ? descriptor.script.content : '';
  if (template) {
    const render = compileTemplate(template.content);
    script = injectRender(script, render);
  }

  const output = writeFile(file, script);
  return compileJs(output, file, { noWarn: true });
}

module.exports = compileSfc;
