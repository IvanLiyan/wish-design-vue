#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { analyzeVariables } from './index';

const commander = require('commander');

commander.version('0.0.1');

commander.command('verify').description('login to publish').action(verifyCommentRule);

commander.parse(process.argv);

async function verifyCommentRule() {
    if (!process.argv[3]) {
        throw new Error('need giving variable file path');
    }
    const relativeVariableFile = process.argv[3];
    const variableFilePath = path.join(process.cwd(), relativeVariableFile);
    if (!fs.existsSync(variableFilePath)) {
        throw new Error('variable file not exist');
    }
    await analyzeVariables(variableFilePath);
}
