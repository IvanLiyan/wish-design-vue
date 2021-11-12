<style lang="scss">
  .demo-input-container,.demo-input-group{
    display:flex;
    justify-content: center;
    margin-bottom:20px;
    &>div{
        margin-right:10px;
        &:last-child{
            margin-right:0;
        }
    }
  }
  .demo-input-group{
      justify-content: start;
  }
</style>

# 文本输入框 / Input

用于收集用户通过鼠标或键盘提供的信息。

## 单行文本

### 基础样式

基本使用，可自定义内置标题，占位符，图标，标签，提示和验证。

:::include(src="./doc/base-input.vue")
:::

### 状态变化

输入框的聚焦、点击状态，不可编辑状态，以及报错状态。

:::include(src="./doc/active-input.vue")
:::

### 应用

输入框的聚焦、点击状态，不可编辑状态，以及报错状态。

:::include(src="./doc/type-input.vue")
:::

## 多行文本

### 基础样式

用于收集用户输入的大量信息。

:::include(src="./doc/base-textarea.vue")
:::

### 状态变化

输入框的聚焦、点击状态，不可编辑状态，以及报错状态。

:::include(src="./doc/active-textarea.vue")
:::

### Attributes

## API

<api-doc name="Button" :doc="require('./api.json')"></api-doc>

### Show all, for UI check

:::include(src="./doc/show.vue")
:::
