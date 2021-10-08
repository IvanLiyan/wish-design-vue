// 基础变量
/**
 * @name string 中文名
 * @hide boolean 不展示 块级
 * @unconfigurable boolean 不可配置 块级
 */

// 组件变量
/**
 * @name string 中文名
 * @hide boolean 不展示 块级
 * @unconfigurable boolean 不可配置 块级
 * @value string 表达式的值
 * @refer string 引用 type?(/category)
 */

// 基础组件格式
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

export enum ConfigType {
    SELECT,
    INPUT,
    COLOR,
}

export interface StringMap {
    [key: string]: string;
}

export interface BaseVariableItem {
    attribute: string; // css attribute
    value: string; // css value
    label: string; // 中文名
    hide: boolean; // 默认隐藏
    unconfigurable: boolean; // 不可配置，纯展示
    unselected: boolean; // 不可选择
    expressionValue: string; // 通过表达式计算的值
    isolation: boolean; // 如果该值为true，则不需要查找组件变量依赖的基础变量关系，直接展示基础变量对应的值
    configType: ConfigType;
}

export interface ComponentVariableItem {
    attribute: string; // css attribute
    value: string; // css value
    label: string; // 中文名
    hide: boolean; // 默认隐藏
    unconfigurable: boolean; // 不可配置，纯展示
    expressionValue: string; // 通过表达式计算的值
    refer: string; // 引用样式
    isolation: boolean; // 如果该值为true，则不需要查找组件变量依赖的基础变量关系，直接展示基础变量对应的值
    configType: ConfigType;
}

export interface ComponentStateItem {
    stateName: string; // state的名称 例如loading，disabled
    stateLabel: string;
    variables: ComponentVariableItem[];
}

export interface ComponentDOMItem {
    domName: string; // dom的名称，例如icon
    domLabel: string;
    domState: ComponentStateItem[];
    variables: ComponentVariableItem[];
}

export interface ComponentPropsItem {
    propsName: string; // 组件的props值，例如 small
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
    categoryName: string; // 组件的props name, 例如size
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
    include: string[]; // 该组件引用的其他组件
    category: ComponentCategoryItem[];
}

export interface CompPropType {
    base: {
        // 所有的基础变量
        [baseName: string]: BaseItem; // baseName为基础变量的名称，例如color
    };
    component: {
        // 所有的组件变量
        [componentName: string]: ComponentItem; // componentName为组件变量的名称，例如button
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

export let analyzeVariables: (path: string) => Promise<CompPropType>;

export let compute: (path: string) => Promise<ResultType>;
