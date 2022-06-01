# Layout / 布局
<span>灵活的自适应布局</span>

`<wt-layout>`：外层容器。当子元素中包含 `<wt-header>` 或 `<wt-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<wt-header>`：顶栏容器。

`<wt-aside>`：侧边栏容器。

`<wt-main>`：主要区域容器。

`<wt-footer>`：底栏容器。

:::include(src="./doc/base.vue")
:::

## API
<api-doc name="Layout" :doc="require('./api.json')"></api-doc>
<api-doc name="Header" :doc="require('./../header/api.json')"></api-doc>
<api-doc name="Aside" :doc="require('./../aside/api.json')"></api-doc>
<api-doc name="Main" :doc="require('./../main/api.json')"></api-doc>
<api-doc name="Footer" :doc="require('./../footer/api.json')"></api-doc>
