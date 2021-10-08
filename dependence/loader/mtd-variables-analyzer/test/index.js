const path = require('path');
const { analyzeVariables } = require('../lib');
console.time('js');
// analyzeVariables(path.join(__dirname, '../case/error.scss'))
analyzeVariables(path.join(__dirname, '../case/right.scss'));
