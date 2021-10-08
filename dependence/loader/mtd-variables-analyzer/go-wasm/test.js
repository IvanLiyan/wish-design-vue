const fs = require('fs');
const path = require('path');
require('./webassembly');

global.computeVariables = function(variables) {
    console.log(variables);
};

(async function () {
    const go = new Go();
    const value = await WebAssembly.instantiateStreaming(require('./variables.wasm'), go.importObject);
    global.variables = fs.readFileSync(path.join(__dirname, './var.scss'));
    let { module, instance} = value;
    await go.run(instance);
    instance = await WebAssembly.instantiate(module, go.importObject);
})();
