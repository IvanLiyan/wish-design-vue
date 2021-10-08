const fs = require('fs');
const readLine = require('readline');
const clone = require('clone-deep');
import { CompPropType, ResultType, StringMap } from './type';
import {
    extractInfo,
    initBaseCategoryItem,
    initBaseItem,
    initBaseVariable,
    initComponentCategoryItem,
    initComponentDomItem,
    initComponentItem,
    initComponentPropsItem,
    initComponentStateItem,
    initComponentVariable,
    matchBaseConfigType,
    matchComponentConfigType,
    verifyComment,
} from './util';

const normalComment = /^\/\/\s+[^@\s]+/;

function noOp(line: string): boolean {
    return !line || normalComment.test(line);
}

export async function analyzeVariables(path: string, variableMap?: StringMap): Promise<CompPropType> {
    let baseItem = initBaseItem();
    let baseCategoryItem = initBaseCategoryItem();
    let componentItem = initComponentItem();
    let componentCategoryItem = initComponentCategoryItem();
    let componentPropsItem = initComponentPropsItem();
    let componentDomItem = initComponentDomItem();
    let componentStateItem = initComponentStateItem();
    let baseVariableItem = initBaseVariable();
    let componentVariableItem = initComponentVariable();

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

    return await new Promise(resolve => {
        const compProp: CompPropType = {
            base: {},
            component: {},
        };
        const input = fs.createReadStream(path);
        const stream = readLine.createInterface({
            input,
        });
        let isEnd = false;
        stream.on('line', (line: string) => {
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
                verifyComment.addComment(line, lineNumber);
                isIgnore = true;
                return;
            }

            if (line.includes('@end ignore')) {
                verifyComment.addComment(line, lineNumber);
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
                            baseVariableItem.value = (variableMap as StringMap)[attribute] || value;
                        } else {
                            baseVariableItem.value = value;
                        }
                        baseVariableItem.configType = matchBaseConfigType(value);
                        // 在执行发布主题merge样式时，如果变量的值为transparent，并且变量名不是color-transparent的情况
                        // 满足上面三个条件后，忽略掉这个变量
                        if (
                            !(
                                isMerged &&
                                baseVariableItem.value === 'transparent' &&
                                baseVariableItem.attribute !== 'color-transparent'
                            )
                        ) {
                            baseCategoryItem.variables.push(clone(baseVariableItem));
                        }
                        baseVariableItem = initBaseVariable();
                    } else {
                        componentVariableItem.attribute = attribute;
                        componentVariableItem.hide = isVariableHide;
                        componentVariableItem.unconfigurable = isVariableUnconfigurable;
                        componentVariableItem.label = componentVariableItem.label || componentVariableItem.attribute;

                        if (isMerged) {
                            componentVariableItem.value = (variableMap as StringMap)[attribute] || value;
                        } else {
                            componentVariableItem.value = value;
                        }
                        componentVariableItem.configType = matchComponentConfigType(componentVariableItem);
                        if (isProcessingState) {
                            componentStateItem.variables.push(clone(componentVariableItem));
                        } else if (isProcessingDom) {
                            componentDomItem.variables.push(clone(componentVariableItem));
                        } else {
                            componentPropsItem.variables.push(clone(componentVariableItem));
                        }
                        componentVariableItem = initComponentVariable();
                    }
                    return;
                }
                verifyComment.addComment(line, lineNumber);
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
                        verifyComment.verifyRules();
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
                    baseItem = initBaseItem();
                    return;
                }

                // 处理组件变量第一级目录
                if (line.includes('@component')) {
                    const [name, label] = extractInfo(line, '@component');
                    componentItem.name = name;
                    componentItem.label = label;
                    return;
                }

                if (line.includes('@end component')) {
                    compProp.component[componentItem.name] = clone(componentItem);
                    componentItem = initComponentItem();
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
                    const [name, label] = extractInfo(line, '@category');
                    if (isBaseVariable) {
                        baseCategoryItem.categoryName = name;
                        baseCategoryItem.categoryLabel = label;
                    } else {
                        componentCategoryItem.categoryName = name;
                        componentCategoryItem.categoryLabel = label;
                    }
                    return;
                }

                if (line.includes('@end category')) {
                    if (isBaseVariable) {
                        baseItem.category.push(clone(baseCategoryItem));
                        baseCategoryItem = initBaseCategoryItem();
                    } else {
                        componentItem.category.push(clone(componentCategoryItem));
                        componentCategoryItem = initComponentCategoryItem();
                    }
                    return;
                }

                if (line.includes('@propsValue')) {
                    const [name, label] = extractInfo(line, '@propsValue');
                    componentPropsItem.propsName = name;
                    componentPropsItem.propsLabel = label;
                    return;
                }

                if (line.includes('@end propsValue')) {
                    componentCategoryItem.props.push(clone(componentPropsItem));
                    componentPropsItem = initComponentPropsItem();
                    return;
                }

                if (line.includes('@dom')) {
                    const [name, label] = extractInfo(line, '@dom');
                    componentDomItem.domName = name;
                    componentDomItem.domLabel = label;
                    isProcessingDom = true;
                    return;
                }

                if (line.includes('@end dom')) {
                    componentPropsItem.dom.push(clone(componentDomItem));
                    componentDomItem = initComponentDomItem();
                    isProcessingDom = false;
                    return;
                }

                if (line.includes('@state')) {
                    const [name, label] = extractInfo(line, '@state');
                    componentStateItem.stateName = name;
                    componentStateItem.stateLabel = label;
                    isProcessingState = true;
                    return;
                }

                if (line.includes('@end state')) {
                    if (isProcessingDom) {
                        componentDomItem.domState.push(clone(componentStateItem));
                    } else {
                        componentPropsItem.state.push(clone(componentStateItem));
                    }
                    componentStateItem = initComponentStateItem();
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
                    } else {
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
                    } else {
                        baseVariableItem.isolation = true;
                    }
                    return;
                }

                // 变量的中文名，可选
                if (line.includes('@name')) {
                    const label = line.split('@name')[1].trim();
                    if (isBaseVariable) {
                        baseVariableItem.label = label;
                    } else {
                        componentVariableItem.label = label;
                    }
                    return;
                }
            }
        });
    });
}

export async function compute(path: string, variableMap?: StringMap): Promise<ResultType> {
    const result: ResultType = { base: [], components: [], baseVariables: {}, componentVariables: {} };
    const compProp = await analyzeVariables(path, variableMap);
    result.baseVariables = compProp.base;
    result.componentVariables = compProp.component;
    result.base = Object.values(compProp.base).map(item => ({ cnName: item.label, path: item.name }));
    result.components = Object.values(compProp.component).map(item => ({ cnName: item.label, path: item.name }));
    return result;
}
