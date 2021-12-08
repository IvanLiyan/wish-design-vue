const Components = require('../../components.json');
const path = require('path');
const fs = require('fs');
const uppercamelcase = require('uppercamelcase');
const pkg = require('../../package.json');

const OUTPUT_PATH = path.join(__dirname, '../../site/lang.json');
const basepath = path.join(__dirname, '../../components/');
const langContent = {
  chinese: {},
  english: {},
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
