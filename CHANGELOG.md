# 更新日志
## 0.0.2-alpha.60
- 新增了`<wt-table />`的自动分页功能

## 0.0.2-alpha.59
- 修复了`<wt-datepicker />`的输入框在日期时间区间的情况下icon被遮挡的问题

## 0.0.2-alpha.57
- `<wt-tooltip />`的`popper`层默认颜色为`#000`，修复了颜色冲突

## 0.0.2-alpha.56
- `<wt-table />`的`可展开`类型中的前置箭头会随着展开与否而旋转

## 0.0.2-alpha.54
- `<wt-input />`和`<wt-select />`新增插槽`slot=label`，自定义标签内容

## 0.0.2-alpha.52
- 修复了`<wt-select />`的bug: value-key
- 修复了`<wt-datepicker />`和`<wt-timepicker />`在某些情况下确认按钮字体颜色被覆盖的bug
- `<wt-table />`新增了文档说明，新的API —— loading

## 0.0.2-alpha.51
- 修复了`<wt-table />`内置pagination的api缺失问题

## 0.0.2-alpha.50
- 修复了`<select />`的双层边框bug
- 修复了`<timeline />`圆点的位置
- 校准了`<timeline />`在normal状态下的圆点颜色

## 0.0.2-alpha.49
- 更新了 Sidebar 的UI

## 0.0.2-alpha.47

- Layout 组件删除了一个API —— direction
- 完成了以下组件的中英文档：`<Menu/> <Stepper/> <Dialog/>`

## 0.0.2-alpha.45

- `<Table/>` 组件内置 `<Pagination/>` 的默认位置调整为 ```text-right```

## 0.0.2-alpha.43

- `<Table/>` 加入了内置 `<Pagination/>`，可通过API在`<Table/>`组件内使用分页功能。当然，你也可以单独使用 `<Pagination/>`来实现分页功能

## 0.0.2-alpha.42

- `<Table/>` 新增了一个类型demo - 自定义列模板，演示了如何通过slot插槽的形式来实现列表的某些固定列内容填充

## 0.0.2-alpha.41

- 修复了 `<Tab/>` 的bug
- `<Datepicker/>` 新增了一个API —— value-format
<!-- `2021-07-06`

#### Feature

- 增加 Menu 组件 lazy 属性，用于优化性能，懒加载子菜单项 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/10984313)
- 增加 TabPane 组件 lazy 用于优化性能，当未激活时不挂载 pane 内元素
- 增加 Modal 组件 enable-click-through 属性，用于设置是否允许点击 Modal 下方元素 [TT](https://tt.sankuai.com/ticket/detail?id=40402170)

  ```
  $icon-font-path: '~@ss/wt-vue/packages/theme-chalk/fonts';
  @import "@ss/wt-vue/packages/theme-chalk/index.scss";
  ```

  改为

  ```
  $icon-font-path: '~@ss/wt-vue/components/theme-chalk/fonts';
  @import "@ss/wt-vue/components/theme-chalk/index.scss";
  ``` -->
