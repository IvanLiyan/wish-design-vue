const Components = require('../../components.json');
const fs = require('fs');
const path = require('path');
const { themes } = require('../../config');

const basepath = path.resolve(__dirname, '../../components');

function fileExists (filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

themes.forEach((theme) => {
  if (theme !== 'theme-chalk') {
    const indexContent = [
      '/* Automatically generated by \'../../../build/bin/build-css.js\' */',
      '@import "./common/var.scss";',
      '@import "./base.scss";',
      '@import "./icon.scss";'
    ];
    const OUTPUT_PATH = path.resolve(basepath, theme, 'index.scss');
    Object.keys(Components).forEach((key) => {
      if (key === 'icon') return;
      const fileName = `${key}.scss`;
      indexContent.push(`@import "./${fileName}";`);
      const filePath = path.resolve(basepath, theme, fileName);
      if (!fileExists(filePath)) {
        const content = [
          '@import "./common/var.scss";',
          `@import "../theme-chalk/${key}.scss";`
        ]
        fs.writeFileSync(filePath, content.join('\n'), 'utf8');
      }
    });
    fs.writeFileSync(
      OUTPUT_PATH,
      indexContent.join('\n') + '\n'
    );

  } else {
    const indexContent = [
      '/* Automatically generated by \'../../../build/bin/build-css.js\' */',
      '@import "./base.scss";'
    ];
    const OUTPUT_PATH = path.resolve(basepath, theme, 'index.scss');

    Object.keys(Components).forEach((key) => {
      const fileName = `${key}.scss`;
      indexContent.push(`@import "./${fileName}";`);
      const filePath = path.resolve(basepath, theme, fileName);
      if (!fileExists(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
        console.error(theme, ' 创建遗漏的 ', fileName, ' 文件');
      }
    });
    fs.writeFileSync(
      OUTPUT_PATH,
      indexContent.join('\n') + '\n'
    );
    console.log('[build css] DONE:', OUTPUT_PATH);
  }
});

