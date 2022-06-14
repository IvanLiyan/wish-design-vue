# 侧边栏 / Sidebar
<span>用于展示页面结构和层级</span>

## 基础样式
<span>菜单栏由菜单栏项目组成。菜单栏项目可分为主菜单栏和次菜单栏。主菜单栏含有图标，文字和展开按钮，次菜单栏为纯文字。</span>
<br />
<span>菜单栏还可以包含通知。</span>
<br />
<br />
<span>菜单栏可以为横向或者纵向，默认只展开一个，也可以配置展开多个。</span>
:::include(src="./doc/base.vue")
:::

<!-- ## 类型与用法
### 深色主题 <version-tag>0.3.4</version-tag>
:::include(src="./doc/theme.vue")
:::

### 自定义内容 <version-tag>0.3.10</version-tag>
:::include(src="./doc/custom.vue")
::: -->
## API
<api-doc name="Sidebar" :doc="require('./api.json')"></api-doc>
### data 字段说明
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|--- |--- |--- |--- |--- |
| id | 菜单的唯一标识，可以使用 Sidebar 组件的 item-key 属性进行更改 | string | - | - |
| icon | 菜单的图标 | string | - | - |
| title | 菜单的标题 | string | - | - |
| tooltip | tooltip 显示的内容 | string | - | 收起状态下默认显示 title 字段 |
| disabled | 是否禁用 | boolean | - | false |
| route | 配置改属性后使用 router-link 组件进行渲染，该属性可选值同 router-link 组件 to 属性，详细请参考 [router-link](https://router.vuejs.org/zh/api/#to) | string / object | - | - |
| replace | 仅当配置 route 属性生效，同 router-link replace 属性 | boolean | - | false |
| exact | 仅当配置 route 属性生效，同 router-link exact 属性 | boolean | - | - |
| href | 同 a 标签 href 属性 | string | - | - |
| target | 同 a 标签 target 属性 | string | - | - |
| rel | 同 a 标签 rel 属性 | string | - | - |
| children | 子菜单项 | Array | - | - |
| enabledTooltip |  0.3.21 版本支持，在菜单项被禁用时，是否可以显示 tooltip | boolean | - | false |

<!-- ## QA测试
:::include(src="./doc/tests.vue")
::: -->