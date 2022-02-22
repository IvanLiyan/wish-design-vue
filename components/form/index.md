<style lang="scss">
  .demo-wt-form-helper {
    font-size: 12px;
    color: #ADADAD;
    margin-left: 12px;
  }
  .demo-form-tooltip{
    margin-left: 12px;
  }
  .demo-form-title{
    text-align: left;
    font-size: 12px;
    color: #999
  }
</style>

# 表单 / Form

表单组件，包含数据录入样式，自带数据管理和校验。

## 应用举例

横版满屏排列，一行内可以根据栅格放多个元素，但不建议超过 4 个。

:::include(src="./doc/multiple.vue")
:::

<!-- 竖版排列，一行只有 1 个元素。

:::include(src="./doc/single.vue")
::: -->

## API

<api-doc name="Form" :doc="require('./api.json')"></api-doc>

### 校验规则

| 参数     | 说明                                                        | 类型    | 默认值  |
| -------- | ----------------------------------------------------------- | ------- | ------- |
| trigger  | 触发条件, 非必填, 可选值: 'blur'、'change',默认两者时都触发 | string  | -       |
| min      | 最小长度                                                    | number  | -       |
| max      | 最大长度                                                    | number  | -       |
| message  | 校验文案                                                    | string  | -       |
| pattern  | 正则表达式校验                                              | RegExp  | -       |
| required | 是否必选                                                    | boolean | `false` |

| validator | 自定义校验（**注意 callback 必须被调用**）, 支持 source 参数，source 为当前表单 modal 属性值 | function(rule, value, callback, source) | - |

更多用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

<api-doc name="FormItem" :doc="require('../form-item/api.json')"></api-doc>
