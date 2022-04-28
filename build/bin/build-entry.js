const Components = require('../../components.json');
const path = require('path');
const fs = require('fs');
const uppercamelcase = require('uppercamelcase');
const pkg = require('../../package.json');

const OUTPUT_PATH = path.join(__dirname, '../../src/index.js');

const importComponentTemplate = [];
const installTemplate = [];
const listTemplate = [];
Object.keys(Components).forEach((name) => {
  const componentName = uppercamelcase(name);
  const path = Components[name];
  importComponentTemplate.push(`import ${componentName} from '${path}';`);

  listTemplate.push(componentName);

  // if (['message', 'notification', 'confirm'].includes(name)) {
  //   return;
  // }
  installTemplate.push(componentName);
});

const importStr = importComponentTemplate.join('\n');
// 为最后一行加上尾逗号，防止报错
const installStr = installTemplate.join(',\n  ') + ',';
const listStr = listTemplate.join(',\n  ') + ',';

const template = `/* Automatically generated by './build/bin/build-entry.js' TODO 打开下面注释 */
${importStr}
import ExpansionTransition from './transitions/expansion-transition';

const components = [
  ${installStr}
  ExpansionTransition,
];

export function install (Vue) {
  components.map(function (component) {
    Vue.component(component.name, component);
  });

  const $wt = {
    // confirm: Confirm,
    notify: Notification,
    // message: Message,
  };

  if (Vue.prototype) Vue.prototype.$wt = $wt;
  if (Vue.config.globalProperties) Vue.config.globalProperties.$wt = $wt;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  ${listStr}
  ExpansionTransition,
};

export default {
  version: '${pkg.version}',
  install,
};
`;
fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);
