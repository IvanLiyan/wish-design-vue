import {
    BaseCategoryItem,
    BaseItem,
    BaseVariableItem,
    ComponentCategoryItem,
    ComponentDOMItem,
    ComponentItem,
    ComponentPropsItem,
    ComponentStateItem,
    ComponentVariableItem,
    ConfigType,
} from './type';

export const initBaseItem: () => BaseItem = () => ({
    name: '',
    label: '',
    category: [],
});

export const initComponentItem: () => ComponentItem = () => ({
    name: '',
    label: '',
    include: [],
    category: [],
});

export const initBaseCategoryItem: () => BaseCategoryItem = () => ({
    categoryName: '',
    categoryLabel: '',
    variables: [],
});

export const initComponentCategoryItem: () => ComponentCategoryItem = () => ({
    categoryName: '',
    categoryLabel: '',
    props: [],
});

export const initComponentPropsItem: () => ComponentPropsItem = () => ({
    propsName: '',
    propsLabel: '',
    variables: [],
    state: [],
    dom: [],
});

export const initComponentStateItem: () => ComponentStateItem = () => ({
    stateName: '',
    stateLabel: '',
    variables: [],
});

export const initComponentDomItem: () => ComponentDOMItem = () => ({
    domName: '',
    domLabel: '',
    domState: [],
    variables: [],
});

export const initBaseVariable: () => BaseVariableItem = () => ({
    attribute: '',
    value: '',
    label: '',
    hide: false,
    unconfigurable: false,
    expressionValue: '',
    isolation: false,
    unselected: false,
    configType: ConfigType.INPUT,
});

export const initComponentVariable: () => ComponentVariableItem = () => ({
    attribute: '',
    value: '',
    label: '',
    hide: false,
    unconfigurable: false,
    expressionValue: '',
    refer: '',
    isolation: false,
    configType: ConfigType.INPUT,
});

export const extractInfo: (line: string, token: string) => string[] = (line: string, token: string) => {
    const list = line.split(token)[1].trim().split(' ');
    if (list.length == 2) {
        return list;
    }
    return [list[0], list[0]];
};

export function matchBaseConfigType(value: string): ConfigType {
    if (value.startsWith('#') || value.startsWith('rgb')) {
        return ConfigType.COLOR;
    } else {
        return ConfigType.INPUT;
    }
}

export function matchComponentConfigType(variable: ComponentVariableItem): ConfigType {
    if (variable.isolation) {
        if (variable.value.startsWith('#') || variable.value.startsWith('rgb')) {
            return ConfigType.COLOR;
        }
        return ConfigType.INPUT;
    } else if (variable.refer) {
        return ConfigType.SELECT;
    } else if (variable.value.startsWith('$')) {
        return ConfigType.SELECT;
    } else if (variable.value.startsWith('#') || variable.value.startsWith('rgb')) {
        return ConfigType.COLOR;
    } else {
        return ConfigType.INPUT;
    }
}

export interface CommentItemType {
    comment: string;
    lineNumber: number;
}

class VerifyComment {
    private stack: CommentItemType[] = [];
    private commentReg = /\/\/\s+@.+/;
    private endCommentReg = /\/\/\s+@end.+/;
    private lastComment = '';
    private ignoreRules = ['include', 'value', 'refer', 'isolation', 'name'];

    public getStackTop() {
        return this.stack[this.stack.length - 1]?.comment;
    }

    public extractRule(comment: string) {
        if (comment.includes('@end')) {
            return comment.split('@end')[1].trim();
        }
        return comment.split('@')[1].trim().split(' ')[0].trim();
    }

    public extractErrorRule() {
        while (true) {
            const startComment = this.stack.shift();
            const endComment = this.stack.pop();
            if (!startComment || !endComment) {
                return this.lastComment;
            }
            if (this.endCommentReg.test(startComment?.comment) && this.endCommentReg.test(endComment?.comment)) {
                return this.lastComment;
            }
            if (this.extractRule(startComment?.comment) !== this.extractRule(endComment?.comment)) {
                return this.lastComment;
            }
            this.lastComment = JSON.stringify(startComment);
        }
    }

    public addComment(comment: string, lineNumber: number) {
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
            } else {
                this.stack.push({
                    comment,
                    lineNumber,
                });
            }
        } else {
            this.stack.push({
                comment,
                lineNumber,
            });
        }
    }

    public verifyRules() {
        if (this.stack.length === 0) {
            return true;
        }
        throw new Error(`comment rules verify failed, ${this.extractErrorRule()}`);
    }
}

export const verifyComment = new VerifyComment();
