/**
 * @name string 中文名
 * @hide boolean 不展示 块级
 * @unconfigurable boolean 不可配置 块级
 */
/**
 * @name string 中文名
 * @hide boolean 不展示 块级
 * @unconfigurable boolean 不可配置 块级
 * @value string 表达式的值
 * @refer string 引用 type?(/category)
 */
/**
 @module base
 @type color
 @category base
 @end category
 @end type
 @end module
 */
/**
 @module component
 @category size
 @propsValue mini

 @dom button

 @state hover
 @end state

 @end dom
 @isolation

 @state hover
 @end state

 @end propsValue
 @end category
 @end module
 */
export declare enum ConfigType {
    SELECT = 0,
    INPUT = 1,
    COLOR = 2
}
export interface StringMap {
    [key: string]: string;
}
export interface BaseVariableItem {
    attribute: string;
    value: string;
    label: string;
    hide: boolean;
    unconfigurable: boolean;
    unselected: boolean;
    expressionValue: string;
    isolation: boolean;
    configType: ConfigType;
}
export interface ComponentVariableItem {
    attribute: string;
    value: string;
    label: string;
    hide: boolean;
    unconfigurable: boolean;
    expressionValue: string;
    refer: string;
    isolation: boolean;
    configType: ConfigType;
}
export interface ComponentStateItem {
    stateName: string;
    stateLabel: string;
    variables: ComponentVariableItem[];
}
export interface ComponentDOMItem {
    domName: string;
    domLabel: string;
    domState: ComponentStateItem[];
    variables: ComponentVariableItem[];
}
export interface ComponentPropsItem {
    propsName: string;
    propsLabel: string;
    variables: ComponentVariableItem[];
    state: ComponentStateItem[];
    dom: ComponentDOMItem[];
}
export interface BaseCategoryItem {
    categoryName: string;
    categoryLabel: string;
    variables: BaseVariableItem[];
}
export interface ComponentCategoryItem {
    categoryName: string;
    categoryLabel: string;
    props: ComponentPropsItem[];
}
export interface BaseItem {
    name: string;
    label: string;
    category: BaseCategoryItem[];
}
export interface BaseVariables {
    [key: string]: BaseItem;
}
export interface ComponentVariables {
    [key: string]: ComponentItem;
}
export interface ComponentItem {
    name: string;
    label: string;
    include: string[];
    category: ComponentCategoryItem[];
}
export interface CompPropType {
    base: {
        [baseName: string]: BaseItem;
    };
    component: {
        [componentName: string]: ComponentItem;
    };
}
export interface RouteItem {
    cnName: string;
    path: string;
}
export interface ResultType {
    base: RouteItem[];
    components: RouteItem[];
    baseVariables: BaseVariables;
    componentVariables: ComponentVariables;
}
export declare let analyzeVariables: (path: string) => Promise<CompPropType>;
export declare let compute: (path: string) => Promise<ResultType>;
