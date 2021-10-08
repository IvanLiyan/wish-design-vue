"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compute = exports.analyzeVariables = void 0;
const fs = require('fs');
const readLine = require('readline');
const clone = require('clone-deep');
const util_1 = require("./util");
const normalComment = /^\/\/\s+[^@\s]+/;
function noOp(line) {
    return !line || normalComment.test(line);
}
function analyzeVariables(path, variableMap) {
    return __awaiter(this, void 0, void 0, function* () {
        let baseItem = util_1.initBaseItem();
        let baseCategoryItem = util_1.initBaseCategoryItem();
        let componentItem = util_1.initComponentItem();
        let componentCategoryItem = util_1.initComponentCategoryItem();
        let componentPropsItem = util_1.initComponentPropsItem();
        let componentDomItem = util_1.initComponentDomItem();
        let componentStateItem = util_1.initComponentStateItem();
        let baseVariableItem = util_1.initBaseVariable();
        let componentVariableItem = util_1.initComponentVariable();
        let isIgnore = false;
        let isMultiLineComment = false;
        let isBaseVariable = false;
        let isComponentVariable = false;
        let isProcessingDom = false;
        let isProcessingState = false;
        let isVariableHide = false;
        let isVariableUnconfigurable = false;
        let isUnselected = false;
        const isMerged = !!variableMap;
        let lineNumber = 0;
        return yield new Promise(resolve => {
            const compProp = {
                base: {},
                component: {},
            };
            const input = fs.createReadStream(path);
            const stream = readLine.createInterface({
                input,
            });
            let isEnd = false;
            stream.on('line', (line) => {
                if (isEnd) {
                    return;
                }
                lineNumber++;
                line = line.trim();
                // 处理多行注释
                if (line.includes('/*')) {
                    isMultiLineComment = true;
                    return;
                }
                if (isMultiLineComment) {
                    if (line.includes('*/')) {
                        isMultiLineComment = false;
                        return;
                    }
                }
                if (line.includes('@ignore')) {
                    util_1.verifyComment.addComment(line, lineNumber);
                    isIgnore = true;
                    return;
                }
                if (line.includes('@end ignore')) {
                    util_1.verifyComment.addComment(line, lineNumber);
                    isIgnore = false;
                    return;
                }
                if (!(noOp(line) || isIgnore || isMultiLineComment || line.startsWith('$icon-font-path'))) {
                    if (line.startsWith('$') && line.includes('!default')) {
                        const variable = line.split(':').map(variableItem => variableItem.trim());
                        const attribute = variable[0].slice(1);
                        const value = variable[1].split('!default')[0].trim();
                        if (isBaseVariable) {
                            baseVariableItem.attribute = attribute;
                            baseVariableItem.hide = isVariableHide;
                            baseVariableItem.unconfigurable = isVariableUnconfigurable;
                            baseVariableItem.unselected = isUnselected;
                            baseVariableItem.label = baseVariableItem.label || baseVariableItem.attribute;
                            if (isMerged) {
                                baseVariableItem.value = variableMap[attribute] || value;
                            }
                            else {
                                baseVariableItem.value = value;
                            }
                            baseVariableItem.configType = util_1.matchBaseConfigType(value);
                            // 在执行发布主题merge样式时，如果变量的值为transparent，并且变量名不是color-transparent的情况
                            // 满足上面三个条件后，忽略掉这个变量
                            if (!(isMerged &&
                                baseVariableItem.value === 'transparent' &&
                                baseVariableItem.attribute !== 'color-transparent')) {
                                baseCategoryItem.variables.push(clone(baseVariableItem));
                            }
                            baseVariableItem = util_1.initBaseVariable();
                        }
                        else {
                            componentVariableItem.attribute = attribute;
                            componentVariableItem.hide = isVariableHide;
                            componentVariableItem.unconfigurable = isVariableUnconfigurable;
                            componentVariableItem.label = componentVariableItem.label || componentVariableItem.attribute;
                            if (isMerged) {
                                componentVariableItem.value = variableMap[attribute] || value;
                            }
                            else {
                                componentVariableItem.value = value;
                            }
                            componentVariableItem.configType = util_1.matchComponentConfigType(componentVariableItem);
                            if (isProcessingState) {
                                componentStateItem.variables.push(clone(componentVariableItem));
                            }
                            else if (isProcessingDom) {
                                componentDomItem.variables.push(clone(componentVariableItem));
                            }
                            else {
                                componentPropsItem.variables.push(clone(componentVariableItem));
                            }
                            componentVariableItem = util_1.initComponentVariable();
                        }
                        return;
                    }
                    util_1.verifyComment.addComment(line, lineNumber);
                    // 确认当前变量是基础变量还是组件变量
                    if (line.includes('@module base')) {
                        isBaseVariable = true;
                        return;
                    }
                    if (line.includes('@module component')) {
                        isComponentVariable = true;
                        return;
                    }
                    if (line.includes('@end module')) {
                        if (isBaseVariable) {
                            isBaseVariable = false;
                        }
                        if (isComponentVariable) {
                            isComponentVariable = false;
                            util_1.verifyComment.verifyRules();
                            isEnd = true;
                            resolve(compProp);
                        }
                        return;
                    }
                    // 处理基础变量第一级目录
                    if (line.includes('// @type')) {
                        const itemInfoList = line.slice(3).split(' ');
                        baseItem.name = itemInfoList[1];
                        baseItem.label = itemInfoList[2] || baseItem.name;
                        return;
                    }
                    if (line.includes('// @end type')) {
                        compProp.base[baseItem.name] = clone(baseItem);
                        baseItem = util_1.initBaseItem();
                        return;
                    }
                    // 处理组件变量第一级目录
                    if (line.includes('@component')) {
                        const [name, label] = util_1.extractInfo(line, '@component');
                        componentItem.name = name;
                        componentItem.label = label;
                        return;
                    }
                    if (line.includes('@end component')) {
                        compProp.component[componentItem.name] = clone(componentItem);
                        componentItem = util_1.initComponentItem();
                        return;
                    }
                    // 处理组件包含哪些其他的组件
                    if (line.includes('@include')) {
                        componentItem.include = line
                            .split('@include')[1]
                            .trim()
                            .split(',')
                            .map(val => val.trim());
                        return;
                    }
                    // 处理第二级变量
                    if (line.includes('@category')) {
                        const [name, label] = util_1.extractInfo(line, '@category');
                        if (isBaseVariable) {
                            baseCategoryItem.categoryName = name;
                            baseCategoryItem.categoryLabel = label;
                        }
                        else {
                            componentCategoryItem.categoryName = name;
                            componentCategoryItem.categoryLabel = label;
                        }
                        return;
                    }
                    if (line.includes('@end category')) {
                        if (isBaseVariable) {
                            baseItem.category.push(clone(baseCategoryItem));
                            baseCategoryItem = util_1.initBaseCategoryItem();
                        }
                        else {
                            componentItem.category.push(clone(componentCategoryItem));
                            componentCategoryItem = util_1.initComponentCategoryItem();
                        }
                        return;
                    }
                    if (line.includes('@propsValue')) {
                        const [name, label] = util_1.extractInfo(line, '@propsValue');
                        componentPropsItem.propsName = name;
                        componentPropsItem.propsLabel = label;
                        return;
                    }
                    if (line.includes('@end propsValue')) {
                        componentCategoryItem.props.push(clone(componentPropsItem));
                        componentPropsItem = util_1.initComponentPropsItem();
                        return;
                    }
                    if (line.includes('@dom')) {
                        const [name, label] = util_1.extractInfo(line, '@dom');
                        componentDomItem.domName = name;
                        componentDomItem.domLabel = label;
                        isProcessingDom = true;
                        return;
                    }
                    if (line.includes('@end dom')) {
                        componentPropsItem.dom.push(clone(componentDomItem));
                        componentDomItem = util_1.initComponentDomItem();
                        isProcessingDom = false;
                        return;
                    }
                    if (line.includes('@state')) {
                        const [name, label] = util_1.extractInfo(line, '@state');
                        componentStateItem.stateName = name;
                        componentStateItem.stateLabel = label;
                        isProcessingState = true;
                        return;
                    }
                    if (line.includes('@end state')) {
                        if (isProcessingDom) {
                            componentDomItem.domState.push(clone(componentStateItem));
                        }
                        else {
                            componentPropsItem.state.push(clone(componentStateItem));
                        }
                        componentStateItem = util_1.initComponentStateItem();
                        isProcessingState = false;
                        return;
                    }
                    // 确定变量是否被隐藏
                    if (line.includes('@hide')) {
                        isVariableHide = true;
                        return;
                    }
                    if (line.includes('@end hide')) {
                        isVariableHide = false;
                        return;
                    }
                    if (line.includes('@unconfigurable')) {
                        isVariableUnconfigurable = true;
                        return;
                    }
                    if (line.includes('@end unconfigurable')) {
                        isVariableUnconfigurable = false;
                        return;
                    }
                    if (line.includes('@unselected')) {
                        isUnselected = true;
                        return;
                    }
                    if (line.includes('@end unselected')) {
                        isUnselected = false;
                        return;
                    }
                    // 如果一个变量的值是表达式，通过该注解获取到表达式的值
                    if (line.includes('@value')) {
                        const value = line.split('@value')[1].trim();
                        if (isComponentVariable) {
                            componentVariableItem.expressionValue = value;
                        }
                        else {
                            baseVariableItem.expressionValue = value;
                        }
                        return;
                    }
                    // 如果一个变量的值是引用的其他变量，确定该变量的可选范围
                    if (line.includes('@refer')) {
                        componentVariableItem.refer = line.split('@refer')[1].trim();
                        return;
                    }
                    if (line.includes('@isolation')) {
                        if (isComponentVariable) {
                            componentVariableItem.isolation = true;
                        }
                        else {
                            baseVariableItem.isolation = true;
                        }
                        return;
                    }
                    // 变量的中文名，可选
                    if (line.includes('@name')) {
                        const label = line.split('@name')[1].trim();
                        if (isBaseVariable) {
                            baseVariableItem.label = label;
                        }
                        else {
                            componentVariableItem.label = label;
                        }
                        return;
                    }
                }
            });
        });
    });
}
exports.analyzeVariables = analyzeVariables;
function compute(path, variableMap) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = { base: [], components: [], baseVariables: {}, componentVariables: {} };
        const compProp = yield analyzeVariables(path, variableMap);
        result.baseVariables = compProp.base;
        result.componentVariables = compProp.component;
        result.base = Object.values(compProp.base).map(item => ({ cnName: item.label, path: item.name }));
        result.components = Object.values(compProp.component).map(item => ({ cnName: item.label, path: item.name }));
        return result;
    });
}
exports.compute = compute;
//# sourceMappingURL=index.js.map