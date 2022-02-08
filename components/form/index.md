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

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。

## 基础样式

:::include(src="./doc/base.vue")
:::

## API

<api-doc name="Form" :doc="require('./api.json')"></api-doc>

### 校验规则

| 参数     | 说明                                       | 类型    | 默认值  |
| -------- | ------------------------------------------ | ------- | ------- |
| trigger  | 触发条件, 非必填, 可选值: 'blur'、'change' | string  | -       |
| max      | 最大长度                                   | number  | -       |
| message  | 校验文案                                   | string  | -       |
| min      | 最小长度                                   | number  | -       |
| pattern  | 正则表达式校验                             | RegExp  | -       |
| required | 是否必选                                   | boolean | `false` |

| validator | 自定义校验（**注意 callback 必须被调用**）, 支持 source 参数，source 为当前表单 modal 属性值 | function(rule, value, callback, source) | - |

更多用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

<api-doc name="FormItem" :doc="require('../form-item/api.json')"></api-doc>
