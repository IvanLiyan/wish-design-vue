'use strict';
const { escapeHTML, escapeDoubleCurlyBrace } = require('./util/index');

module.exports = vueSourceDocLoader;

function vueSourceDocLoader(source) {
  const filePath = this.resource.split('?')[0];
  const pathList = filePath.split('/');
  if (pathList.includes('doc') && !pathList.includes('demo.vue')) {
    try {
      let list = source.split('</template>');
      if (list.length < 2) {
        return source;
      }
      const startTemplateIndex = source.indexOf('<template>');
      const endTemplateIndex = source.lastIndexOf('</template>');
      const content = source.substring(startTemplateIndex, endTemplateIndex);
      return `${source.substring(0, startTemplateIndex)}
              <template>
              <demo-block>
                      <div slot="source">${content}</template> </div>
                              <pre>${escapeDoubleCurlyBrace(escapeHTML(source))}</pre>
              </demo-block>
              </div>
              </template>
              ${source.substring(endTemplateIndex + '</template>'.length)}`;
    } catch (e) {
      return source;
    }
  }
  return source;
}
