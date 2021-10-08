"use strict";
// 基础变量
/**
 * @name string 中文名
 * @hide boolean 不展示 块级
 * @unconfigurable boolean 不可配置 块级
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compute = exports.analyzeVariables = exports.ConfigType = void 0;
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
var ConfigType;
(function (ConfigType) {
    ConfigType[ConfigType["SELECT"] = 0] = "SELECT";
    ConfigType[ConfigType["INPUT"] = 1] = "INPUT";
    ConfigType[ConfigType["COLOR"] = 2] = "COLOR";
})(ConfigType = exports.ConfigType || (exports.ConfigType = {}));
//# sourceMappingURL=type.js.map