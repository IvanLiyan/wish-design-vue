const path = require('path');
const fs = require('fs');

function resolve (dir) {
  return path.join(__dirname, '../..', dir);
}

const ROOT_DIR = 'publish/es';
const ROOT = resolve(ROOT_DIR);

function writeFile (file, content, options = {}) {
  const outPath = path.join(ROOT, file).replace('.vue', '.js');
  const dirs = file.split(path.sep).slice(0, -1);
  dirs[0] = ROOT_DIR;
  fs.mkdirSync(dirs.join(path.sep), { recursive: true });

  // if (!options.noWarn && fs.existsSync(outPath)) {
  //   console.warn('文件已存在，将覆盖', file, outPath);
  // }

  fs.writeFileSync(outPath, content);
  return outPath;
}

function copyFile (filePath, file) {
  const outPath = path.join(ROOT, file).replace('.vue', '.js');
  fs.copyFileSync(filePath, outPath)
}

module.exports = {
  writeFile,
  copyFile,
  ROOT,
};
