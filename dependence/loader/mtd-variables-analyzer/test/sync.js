const path = require('path');
const { syncVariable } = require('../lib/bin');

const srcPath = path.join(__dirname, './var.scss');
const distPath = path.join(__dirname, './temp.scss');

syncVariable(srcPath, distPath);
