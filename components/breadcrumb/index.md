# 面包屑 / Breadcrumb

用于页面层级的展示和页面跳转

## 基础样式

:::include(src="./doc/base.vue")
:::

## 类型与用法

默认不展示当前页面标题和箭头。展示箭头时，点击箭头返回上一级菜单

### 标题

:::include(src="./doc/title.vue")
:::

### 返回箭头

:::include(src="./doc/icon.vue")
:::

## API

<api-doc name="Breadcrumb" :doc="require('./api.json')"></api-doc>
<api-doc name="BreadcrumbItem" :doc="require('../breadcrumb-item/api.json')"></api-doc>
