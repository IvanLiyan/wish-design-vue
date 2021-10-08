import { BaseCategoryItem, BaseItem, BaseVariableItem, ComponentCategoryItem, ComponentDOMItem, ComponentItem, ComponentPropsItem, ComponentStateItem, ComponentVariableItem, ConfigType } from './type';
export declare const initBaseItem: () => BaseItem;
export declare const initComponentItem: () => ComponentItem;
export declare const initBaseCategoryItem: () => BaseCategoryItem;
export declare const initComponentCategoryItem: () => ComponentCategoryItem;
export declare const initComponentPropsItem: () => ComponentPropsItem;
export declare const initComponentStateItem: () => ComponentStateItem;
export declare const initComponentDomItem: () => ComponentDOMItem;
export declare const initBaseVariable: () => BaseVariableItem;
export declare const initComponentVariable: () => ComponentVariableItem;
export declare const extractInfo: (line: string, token: string) => string[];
export declare function matchBaseConfigType(value: string): ConfigType;
export declare function matchComponentConfigType(variable: ComponentVariableItem): ConfigType;
export interface CommentItemType {
    comment: string;
    lineNumber: number;
}
declare class VerifyComment {
    private stack;
    private commentReg;
    private endCommentReg;
    private lastComment;
    private ignoreRules;
    getStackTop(): string;
    extractRule(comment: string): string;
    extractErrorRule(): string;
    addComment(comment: string, lineNumber: number): void;
    verifyRules(): boolean;
}
export declare const verifyComment: VerifyComment;
export {};
