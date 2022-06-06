# 伸缩框 / Expansion

## 基础样式

:::include(src="./doc/base.vue")
:::

## 使用

### 展开方式

只能同时展开一个面板。
:::include(src="./doc/single.vue")
:::

可同时展开多个面板。
将 `value` 值设置成数组可同时展开多个
:::include(src="./doc/multi.vue")
:::

### 嵌套折叠面板

面板抽屉内可嵌套多个子级折叠面板。
:::include(src="./doc/fold.vue")
:::

## API

<api-doc name="expansion" :doc="require('./api.json')"></api-doc>
<api-doc name="expansionItem" :doc="require('../expansion-item/api.json')"></api-doc>
