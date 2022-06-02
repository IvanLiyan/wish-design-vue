# 级联 / Cascader

将数据集合，进行分类展示和选择，建议最多展示 4 级菜单。

## 基本样式

:::include(src="./doc/base.vue")
:::

## 类型与用法

### 可选父节点或子节点

:::include(src="./doc/changeOnSelect.vue")
:::

### 交互方式

当层级、分类较多，选用“悬停展示下级菜单”，快速预览菜单内容。
:::include(src="./doc/expand.vue")
:::

### 状态

下拉面板可根据场景配置 disable 状态。
在数据源中配置 `disabled` 为 `true` 来禁用选项。可以通过 `props` 属性来指定(详见 API)
:::include(src="./doc/status.vue")
:::

### 信息回显

回显选中路径，可明确提示和告知用户选中信息的分类来源。
`formatter` 仅支持返回 `string`
:::include(src="./doc/formatter.vue")
:::

## API

<api-doc name="Cascader" :doc="require('./api.json')"></api-doc>
