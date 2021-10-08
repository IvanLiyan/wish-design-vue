const fs = require('fs');
const path = require('path');


let compProp = fs.readFileSync(path.join(__dirname, './props.json')).toString();
compProp = JSON.parse(compProp);
const result = {};
result.baseVariables = compProp.base;
result.componentVariables = compProp.component;
result.base = Object.values(compProp.base).map(item => ({cnName: item.label, path: item.name}));
result.components = Object.values(compProp.component).map(item => ({cnName: item.label, path: item.name}));

fs.writeFileSync(path.join(__dirname, './db.json'), JSON.stringify(result));
