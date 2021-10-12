process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name');
  process.exit(1);
}

const path = require('path');
const fs = require('fs');
const uppercamelcase = require('uppercamelcase');
const ComponentsFile = require('../../components.json');
const { namespace, themes } = require('../../config');
const execSync = require('child_process').execSync;

const componentName = process.argv[2];
const chineseName = process.argv[3] || '';

function resolve (...dirs) {
  return path.join(__dirname, '../../', ...dirs);
}

function createComponentPackage (name) {
  return function (...dirs) {
    return resolve('components', name, ...dirs);
  };
}

function saveFile (file, content) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(file, content + '\n');
  console.log('save file: ', file, ' done');
}

const exportName = uppercamelcase(componentName);
const resolvePackage = createComponentPackage(componentName);
const componentClassName = `${namespace}-${componentName}`;

if (ComponentsFile[componentName]) {
  console.error(`${componentName} 已存在.`);
  process.exit(1);
}
// 添加到 components.json
ComponentsFile[componentName] = `components/${componentName}`;
saveFile(
  resolve('components.json'),
  JSON.stringify(ComponentsFile, null, '  ')
);

// 初始化组件相关文件
const Files = [
  {
    file: resolvePackage('index.md'),
    content: `# ${chineseName} / ${exportName}
### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- |--- |--- |--- |--- |
| —  | —    | —   | — | — |

### Events

| 事件名称 | 说明 | 回调参数 |
|--- |--- |--- |
| — | — | — |`
  },
  {
    file: resolvePackage('index.js'),
    content: `import ${exportName} from './${componentName}.vue';
/* istanbul ignore next */
${exportName}.install = function (Vue) {
  Vue.component(${exportName}.name, ${exportName});
};
export default ${exportName};`
  },
  {
    file: resolvePackage('tests', `${componentName}.spec.js`),
    content: `import { mount } from '@vue/test-utils';
import ${exportName} from '../index';

describe('${exportName}', function () {
  it('create', () => {
    const wrapper = mount(${exportName});
    expect(wrapper.vm).to.exist;
  });
});`
  },
  {
    file: resolvePackage(`${componentName}.vue`),
    content: `<template>
  <div class="${componentClassName}" />
</template>
<script>
export default {
  name: '${uppercamelcase(componentClassName)}',
};
</script>`
  },
  {
    file: resolve(`types/${componentName}.d.ts`),
    content: `import Vue from 'vue';
export declare class ${exportName} extends Vue {
  static install (vue: any): void;
  static name: string
}

export default ${exportName};
`
  }
];

themes.forEach((theme) => {
  Files.push({
    file: resolve('components', theme, `${componentName}.scss`),
    content: `@import "./common/var.scss";
@import "./mixins/mixins.scss";
@include c(${componentName}){\n}`
  });
});

Files.forEach(file => {
  saveFile(file.file, file.content);
});

// 添加到 nav.config.json
const navConfigFile = require('../../examples/nav.config.json');

function findComponentConfig (navConfig) {
  return navConfig.find((nav) => nav.path === '/components');
}

const componentNavs = findComponentConfig(navConfigFile);
// 添加到最后一个 group 中
const { groups } = componentNavs;
groups[groups.length - 1].list.push({
  path: componentName,
  name: exportName,
  cnName: chineseName,
});

saveFile(
  resolve('examples/nav.config.json'),
  JSON.stringify(navConfigFile, null, '  ')
);
require('./build-ts');
execSync('npm run build:file');
execSync('npm run build:css');

console.log('DONE!');
