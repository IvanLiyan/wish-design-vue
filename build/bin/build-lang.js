const Components = require('../../components.json');
const path = require('path');
const fs = require('fs');
const uppercamelcase = require('uppercamelcase');
const pkg = require('../../package.json');

const OUTPUT_PATH = path.join(__dirname, '../../site/lang.json');
const basepath = path.join(__dirname, '../../components/');
const langContent = {
  chinese: {
    'api-head': {
      name: '名称',
      desc: '说明',
      type: '类型',
      option: '可选值',
      default: '默认值',
      version: '版本',
      mean: '含义',
      param: '参数',
      'event-name': '事件名称',
      'event-signature': '事件签名',
      'method-name': '方法名称',
    },
  },
  english: {
    'api-head': {
      name: 'name',
      desc: 'desc',
      type: 'type',
      option: 'option',
      default: 'default',
      version: 'version',
      mean: 'mean',
      param: 'param',
      'event-name': 'event-name',
      'event-signature': 'event-signature',
      'method-name': 'method-name',
    },
  },
};

// const listTemplate = [];

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

Object.keys(Components).forEach((name) => {
  const componentName = uppercamelcase(name);
  // check
  const filePath = path.resolve(basepath, `${name}/lang.json`);
  if (!fileExists(filePath)) {
    return;
  }
  const componentModule = require(filePath);

  langContent.chinese[name] = componentModule.chinese;
  langContent.english[name] = componentModule.english;
});

const langContentTemplate = JSON.stringify(langContent);

const template = `

 ${langContentTemplate}

`;
fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);
