"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyComment = exports.matchComponentConfigType = exports.matchBaseConfigType = exports.extractInfo = exports.initComponentVariable = exports.initBaseVariable = exports.initComponentDomItem = exports.initComponentStateItem = exports.initComponentPropsItem = exports.initComponentCategoryItem = exports.initBaseCategoryItem = exports.initComponentItem = exports.initBaseItem = void 0;
const type_1 = require("./type");
exports.initBaseItem = () => ({
    name: '',
    label: '',
    category: [],
});
exports.initComponentItem = () => ({
    name: '',
    label: '',
    include: [],
    category: [],
});
exports.initBaseCategoryItem = () => ({
    categoryName: '',
    categoryLabel: '',
    variables: [],
});
exports.initComponentCategoryItem = () => ({
    categoryName: '',
    categoryLabel: '',
    props: [],
});
exports.initComponentPropsItem = () => ({
    propsName: '',
    propsLabel: '',
    variables: [],
    state: [],
    dom: [],
});
exports.initComponentStateItem = () => ({
    stateName: '',
    stateLabel: '',
    variables: [],
});
exports.initComponentDomItem = () => ({
    domName: '',
    domLabel: '',
    domState: [],
    variables: [],
});
exports.initBaseVariable = () => ({
    attribute: '',
    value: '',
    label: '',
    hide: false,
    unconfigurable: false,
    expressionValue: '',
    isolation: false,
    unselected: false,
    configType: type_1.ConfigType.INPUT,
});
exports.initComponentVariable = () => ({
    attribute: '',
    value: '',
    label: '',
    hide: false,
    unconfigurable: false,
    expressionValue: '',
    refer: '',
    isolation: false,
    configType: type_1.ConfigType.INPUT,
});
exports.extractInfo = (line, token) => {
    const list = line.split(token)[1].trim().split(' ');
    if (list.length == 2) {
        return list;
    }
    return [list[0], list[0]];
};
function matchBaseConfigType(value) {
    if (value.startsWith('#') || value.startsWith('rgb')) {
        return type_1.ConfigType.COLOR;
    }
    else {
        return type_1.ConfigType.INPUT;
    }
}
exports.matchBaseConfigType = matchBaseConfigType;
function matchComponentConfigType(variable) {
    if (variable.isolation) {
        if (variable.value.startsWith('#') || variable.value.startsWith('rgb')) {
            return type_1.ConfigType.COLOR;
        }
        return type_1.ConfigType.INPUT;
    }
    else if (variable.refer) {
        return type_1.ConfigType.SELECT;
    }
    else if (variable.value.startsWith('$')) {
        return type_1.ConfigType.SELECT;
    }
    else if (variable.value.startsWith('#') || variable.value.startsWith('rgb')) {
        return type_1.ConfigType.COLOR;
    }
    else {
        return type_1.ConfigType.INPUT;
    }
}
exports.matchComponentConfigType = matchComponentConfigType;
class VerifyComment {
    constructor() {
        this.stack = [];
        this.commentReg = /\/\/\s+@.+/;
        this.endCommentReg = /\/\/\s+@end.+/;
        this.lastComment = '';
        this.ignoreRules = ['include', 'value', 'refer', 'isolation', 'name'];
    }
    getStackTop() {
        var _a;
        return (_a = this.stack[this.stack.length - 1]) === null || _a === void 0 ? void 0 : _a.comment;
    }
    extractRule(comment) {
        if (comment.includes('@end')) {
            return comment.split('@end')[1].trim();
        }
        return comment.split('@')[1].trim().split(' ')[0].trim();
    }
    extractErrorRule() {
        while (true) {
            const startComment = this.stack.shift();
            const endComment = this.stack.pop();
            if (!startComment || !endComment) {
                return this.lastComment;
            }
            if (this.endCommentReg.test(startComment === null || startComment === void 0 ? void 0 : startComment.comment) && this.endCommentReg.test(endComment === null || endComment === void 0 ? void 0 : endComment.comment)) {
                return this.lastComment;
            }
            if (this.extractRule(startComment === null || startComment === void 0 ? void 0 : startComment.comment) !== this.extractRule(endComment === null || endComment === void 0 ? void 0 : endComment.comment)) {
                return this.lastComment;
            }
            this.lastComment = JSON.stringify(startComment);
        }
    }
    addComment(comment, lineNumber) {
        if (!this.commentReg.test(comment)) {
            return;
        }
        if (this.ignoreRules.includes(this.extractRule(comment))) {
            return;
        }
        if (this.endCommentReg.test(comment)) {
            const topComment = this.getStackTop();
            const startRule = this.extractRule(topComment);
            const endRule = this.extractRule(comment);
            if (startRule === endRule) {
                this.stack.pop();
            }
            else {
                this.stack.push({
                    comment,
                    lineNumber,
                });
            }
        }
        else {
            this.stack.push({
                comment,
                lineNumber,
            });
        }
    }
    verifyRules() {
        if (this.stack.length === 0) {
            return true;
        }
        throw new Error(`comment rules verify failed, ${this.extractErrorRule()}`);
    }
}
exports.verifyComment = new VerifyComment();
//# sourceMappingURL=util.js.map