# 更新日志

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
