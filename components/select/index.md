# 选择框 / Select

下拉选择器，用于多个选项的选择输入，状态的切换。当选项少于 5 个时，建议用 Radio 或 Checkbox。

## 基础样式

分为基本选择器和带标题选择器两种。
:::include(src="./doc/base.vue")
:::

## 不同状态

:::include(src="./doc/status.vue")
:::

## 应用场景

### 单选

:::include(src="./doc/default.vue")
:::

### 多选

:::include(src="./doc/multiple.vue")
:::

## 搜索选择

:::include(src="./doc/search.vue")
:::

## API

<api-doc name="Select" :doc="require('./api.json')"></api-doc>
<api-doc name="Option" :doc="require('../option/api.json')"></api-doc>

## show

:::include(src="./doc/show.vue")
:::
