#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const childProcess = require('child_process');
import { singleVariables } from './singleVariableMap';
import { doubleVariables } from './doubleVariableMap';

const doubleVariableNameList = Object.keys(doubleVariables);

const pathList = [
    {
        src: './components/theme-chalk/common/_var.scss',
        dist: './components/theme-chalk/common/varTemp.scss',
    },
    {
        src: './components/theme2/common/_var.scss',
        dist: './components/theme2/common/varTemp.scss',
    },
];

export async function syncVariable(srcPath: string, distPath: string) {
    const input = fs.createReadStream(srcPath);
    const readStream = readLine.createInterface({
        input,
    });
    const writeStream = fs.createWriteStream(distPath);

    await new Promise((resolve, reject) => {
        let lastLine = '';
        let isStart = false;
        let isIgnore = false;
        let componentName = '';
        writeStream.on('error', (error: Error) => {
            reject(error);
        });

        readStream.on('error', (error: Error) => {
            reject(error);
        });

        readStream.on('close', () => {
            resolve();
        });
        readStream.on('line', (val: string) => {
            const line = val.trim();
            if (line.includes('@module component')) {
                isStart = true;
                writeStream.write(`${line}\n`);
                return;
            }
            if (!isStart) {
                writeStream.write(`${line}\n`);
                return;
            }

            if (line.includes('@ignore')) {
                isIgnore = true;
                writeStream.write(`${line}\n`);
                return;
            }

            if (line.includes('@end ignore')) {
                isIgnore = false;
                writeStream.write(`${line}\n`);
                return;
            }

            if (isIgnore) {
                writeStream.write(`${line}\n`);
                return;
            }

            if (lastLine.includes('@name')) {
                lastLine = line;
                writeStream.write(`${line}\n`);
                return;
            }

            if (line.includes('@component')) {
                componentName = line.split('@component')[1].trim().split(' ')[0].trim();
                writeStream.write(`${line}\n`);
                return;
            }

            if (line.startsWith('$')) {
                const result = formatVariable(line, componentName);
                writeStream.write(result);
            } else {
                writeStream.write(line.includes('\n') ? line : `${line}\n`);
            }
            lastLine = line;
        });
    });
}

function formatVariable(line: string, componentName: string) {
    // $name => name
    let variableName = line.split(':')[0].trim().slice(1);
    try {
        variableName = variableName.split(componentName)[1].slice(1);
    } catch (e) {
        // variableName = variableName.split('-').slice(1).join('-');
    }
    let variableLabel = '';
    const target = searchDoubleVariableName(variableName);
    if (!target) {
        const variableNameList = variableName.split('-');
        variableLabel = variableNameList.map(item => singleVariables[item] || item).join('-');
    } else {
        const { index: doubleVariableIndex, value: doubleVariableName } = target;
        const doubleVariableLabel = doubleVariables[doubleVariableName];
        const otherVariableNameList = variableName.split(doubleVariableName);
        const mergedVariableNameList: string[] = [];
        for (const item of otherVariableNameList) {
            if (item.includes('-')) {
                const itemList = item.split('-');
                itemList.forEach(value => {
                    if (!!value) {
                        mergedVariableNameList.push(value);
                    }
                });
            }
        }
        const otherVariables = mergedVariableNameList
            .filter(item => !!item)
            .map(item => {
                return {
                    index: variableName.indexOf(item),
                    label: singleVariables[item] || item,
                };
            });
        const mergedVariables = [...otherVariables, { index: doubleVariableIndex, label: doubleVariableLabel }];
        variableLabel = mergedVariables
            .sort((itemA, itemB) => itemA.index - itemB.index)
            .map(item => item.label)
            .join('-');
    }
    variableLabel = variableLabel.trim();
    return `// @name ${variableLabel}\n${line}\n`;
}

function searchDoubleVariableName(variableName: string) {
    for (let i = 0; i < doubleVariableNameList.length; i++) {
        if (variableName.includes(doubleVariableNameList[i])) {
            return {
                index: i,
                value: doubleVariableNameList[i],
            };
        }
    }
    return null;
}

async function generate(func: (srcPath: string, distPath: string) => Promise<void>) {
    for (let i = 0; i < pathList.length; i++) {
        const item = pathList[i];
        const directory = process.cwd();
        const src = path.join(directory, item.src);
        const dist = path.join(directory, item.dist);
        await func(src, dist);
        await new Promise((resolve, reject) => {
            childProcess.exec(`mv ${dist} ${src}`, (error: Error) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }
}

generate(syncVariable);
