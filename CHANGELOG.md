# 更新日志
## 0.3.22
`2021-08-17`
#### Bugfix
- 修复 wepback4+ tree shaking 时样式丢失问题 [TT](https://tt.sankuai.com/ticket/detail?id=41707021)

## 0.3.21
`2021-08-16`
#### Feature
- 增加 目前组件 (Confirm、Form) 内所返回的 Promise reject 对象上都会增加 $$mtd 标识，用于 owl 过滤 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/40843044)
- 增加 支持 webpack4+ tree shaking (仅限 esm 格式引入)
- 增加 Anchor 组件 placement 属性，用于标识锚点组件中竖线所在位置 [TT](https://tt.sankuai.com/ticket/detail?id=40653709)

#### Bugfix
- 调整 Select 组件在 远程搜索 & 无搜索条件 & 无数据 时不在主动显示下拉框 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/40851428)
- 修复 DatePicker 组件在 type='daterange' 下时用户手动输入错误的日期时间造成的组件显示错误 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/40896819)
- 修复 Cascader 组件在校验失败时样式错误 [TT](https://tt.sankuai.com/ticket/detail?id=40713626)
- 修复 Select 组件 types 定义缺少 focus、blur 等函数声明 [TT](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/40707869)
- 修复 InputNumber 组件实际显示 value 可能和传入 value 不一致的问题[Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/41572963)

## 0.3.20
`2021-07-06`
#### Feature
- 增加 Menu 组件 lazy 属性，用于优化性能，懒加载子菜单项 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/10984313)
- 增加 TabPane 组件 lazy 用于优化性能，当未激活时不挂载 pane 内元素
- 增加 Modal 组件 enable-click-through 属性，用于设置是否允许点击 Modal 下方元素 [TT](https://tt.sankuai.com/ticket/detail?id=40402170)

#### Bugfix
- 修复 Select 组件在键盘操作下交互不符合预期问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/40448826)、[TT](https://tt.sankuai.com/ticket/detail?id=40410895)
- 修复 Select 组件在异步搜索无结果时，关闭下拉会闪现暂无数据问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/40370097)
- 修正 DatePicker 组件在 type='daterange'、'datetimerange' 下右侧面板快捷切换年丢失问题
- 修复 Menu 组件在 inline 模式下从多级菜单切换到单级菜单会导致面板关闭的问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/40225655)
- 修复 Cascader 组件在 0.3.19 版本时动态加载报错问题
- 修复 Tabs 组件 lineSize=0 时表现不符合预期的问题 [TT](https://tt.sankuai.com/ticket/detail?id=40321024)
- 修复 Carousel 组件首次加载时会先显示最后一页内容的问题 [TT](https://tt.sankuai.com/ticket/detail?id=40600798)
## 0.3.19
`2021-06-15`
#### Feature
- 增加 InputNumber 组件 allow-empty 属性，用于设置是否允许选项被清空 [TT](https://tt.sankuai.com/ticket/detail?id=40038077)
- 增加 Tree 组件 filter-node-method 属性，用于配合 filter 方法进行树节点筛选
- 增加 Tree 组件 filter 方法，用于实现节点过滤 [Demo](/components/tree#%E8%8A%82%E7%82%B9%E8%BF%87%E6%BB%A4)
#### Bugfix
- 修复 Form、Drawer 组件 types 定义错误 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/40031319)
- 修复 Cascader 组件在搜索中 scopedSlots.default 中丢失 node.data 字段问题
- 调整 Carousel 组件内部实现，修复动态创建 CarouselItem 时可能出现的报错问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/4676889)

## 0.3.18
`2021-06-07`
#### Deprecated
- Form 组件 validateField 方法标记废弃，请使用 validateFields 来替代

#### Feature
- 增加 Tree 组件 auto-expand-parent 属性，用于配置展开子节点的时候是否自动展开父节点
- 增加 Button 组件 round、circle 属性
- 增加 Input、Textarea 组件支持 select 方法，功能同原生 [select](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select)
- 增加 Form 组件 label-suffix 属性，用于设置表单域标签的后缀
- 增加 Form 组件 validateFields 方法，用于对部分表单字段进行校验的方法 [API](/components/form#form-methods)
- 增加 Popover 组件 width 属性，用于快捷设置下拉面板的 width 样式

#### Bugfix
- 修复 Select 组件在 multiple & clearable 且 value 为 undefined 时的报错 [TT](https://tt.sankuai.com/ticket/detail?id=12291266)
- 修复 Menu 组件在 inline 模式下子菜单项过多时无法滚动问题 [TT](https://tt.sankuai.com/ticket/detail?id=12164510)
- 修复在嵌套 Steps 组件时状态样式错误，此修复提升了相关选择器优先级，详细请查看 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/12252112)

## 0.3.17
`2021-05-17`
#### Feature
- 增加 ConfigProvider 组件，详细查看 [文档](/components/config-provider)
- 增加 Form 组件 disabled 属性 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/9731892)

#### Bugfix
- 修复 Pagination 组件在 total 值减少时，currentPage 不会同步变更问题 [TT](https://tt.sankuai.com/ticket/detail?id=11212754)
- 修复 Select 组件在多选 & 远程搜索时无法输入空格的问题 [TT](https://tt.sankuai.com/ticket/detail?id=10600902)
- 修复 Table 组件在 keep-alive 模式下跳转后已显示的超长 Tooltip 不会消失问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/10614190)
- 修复 Anchor 组件在锚点消失时没有解绑的问题 [TT](https://tt.sankuai.com/ticket/detail?id=11156407)
- 修复 Cascader 组件在 multiple & checkStrictly 时取消选中交互逻辑不符合预期问题

## 0.3.16
`2021-04-07`
#### Bugfix
- 修复 DatePicker 组件在 type="daterange" 且 value 为 string[] 时初始值报错 [TT](https://tt.sankuai.com/ticket/detail?id=10802055)

## 0.3.15
`2021-03-31`
#### Bugfix
- 修复 es module 格式包依赖包丢失问题

## 0.3.14
`2021-03-31`
#### Feature
- 增加 Dropdown 组件增加 clickoutside 事件
- 增加 Select 组件在 multiple 下支持 clearable 属性 [TT](https://tt.sankuai.com/ticket/detail?id=10234248)，**在 0.3.14 版本中该功能会引起多选 Select 出现报错，升级至 0.3.18 版本解决**
- 增加 es module 格式输出 [TT](https://tt.sankuai.com/ticket/detail?id=10294060)
- 增加 DatePicker 组件支持 week-start 属性，用于设置周起始日期

#### Bugfix
- 修复 Tabs 组件偶现获取 offsetWidth 报错问题 [TT](https://tt.sankuai.com/ticket/detail?id=9995213)
- 修复 Table 组件 cell-mouse-leave 事件参数中 row、column、cell 丢失问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/10129495)
- 修复 Table 组件在 keep-alive 时页面跳转后 overflow tooltip 不消失问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/10614190)
- 修复 Select 组件搜索模式下使用键盘获取焦点进行搜索后不显示结果 [TT](https://tt.sankuai.com/ticket/detail?id=10258353)
- 修复 Select 组件在 remote & multiple 时无法输入空格问题 [TT](https://tt.sankuai.com/ticket/detail?id=1060090)
- 修复 Confirm 组件关闭动画丢失问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/10121899)

## 0.3.13
`2021-01-28`
#### Bugfix
- 修复 Select 组件在全选时结果显示错误 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/9446951)
- 修复 Select 组件在多选 focus 时样式错误 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/9446827)
- 修复 DatePicker 组件在 type='week' 且 value 为 string 时偶现日期结果显示错误 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/9615805)
- 修复 TimePicker 在禁用部分时间后交互问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/9587787)

## 0.3.12
`2021-01-14`
#### Feature
- 增加 Switch 组件 true-value、false-value、value 属性，同时 actived 属性标记为废弃 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/7424749)
- 增加 Cascader 组件支持 disabled-strictly 属性，用于设置子节点是否继承父节点的禁用状态
- 增加 Cascader 组件支持 expandable-on-disabled 属性，用于设置 disabled 节点是否能够展开 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/9014200)
- 增加 DatePicker 周范围选择 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/8868318)
- 增加 Select 组件在 multiple 时支持 genre 属性
- 增加 Select 组件 tag scopedSlot，用于支持自定义多选标签 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/6608402)
- 增加 Form 组件 validate-on-rule-change 属性，用于配置当 rule 变化时是否触发校验 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/8479939)
- 增加 Sidebar 组件支持一级菜单配置 disabled [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/9305641)

#### Bugfix
- 修复 DatePicker 周选择时格式化日期显示错误 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/9123078)
- 修复 Tooltip 默认显示时可能出现丢失 z-index 问题


## 0.3.11
`2020-11-25`

#### Feature
- 增加 Select 组件 show-select-all 属性，用于配置在多选情况下是否显示全选
- 增加 Button 组件支持 click 事件返回 Promise 后自动 loading [Demo](/components/button#异步按钮)
- 增加 DatePicker 组件支持 formatter 属性，用于自定义输入框显示 [TT](https://tt.sankuai.com/ticket/detail?id=7965115)
- 增加 Upload 组件支持 method 属性，用于设置 HTTP methods
- 增加 Upload 组件支持 on-file-select 属性，提供在用户选择完文件后的钩子 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/7791629)
- 优化 Cascader 组件 expand-trigger="hover" 时展开的交互逻辑 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/7984654)
- 增加 Input、Select、Autocomplete 增加 form-no-validate 属性，用于配置当前组件不触发表单校验 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/8058037)

#### Bugfix
- 修复 Select 组件带搜索的功能在手机上不唤起软键盘问题 [TT](https://tt.sankuai.com/ticket/list?filter=todo&id=7616961)
- 修复 DatePicker 组件在 vue@2.5.22 版本上 slot 报错问题
- 修正 FormItem 表单校验规则中只要有一项是 required: true 则显示必填项 * [PR](http://dev.sankuai.com/code/repo-detail/ss/mtd-vue/pr/158/overview?codeArea=mcode)
- 修正 Select 只配置 scroll-bottom 事件时不生效问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/8084775)
- 修正 InputNumber 校验错误时样式没有红框 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/8079946)
- 修复 Table 在嵌套表格时 hover 样式问题 [TT](https://tt.sankuai.com/ticket/detail?id=7263858)

## 0.3.10
`2020-10-15`
#### Feature
- 修改 Progress 组件在 type='line' 下 value 值不在限制必须小于 100 [TT](https://tt.sankuai.com/ticket/detail?id=6879783)
- 增加 Sidebar 组件支持自定义菜单项内容 [Demo](/components/sidebar/3#自定义内容-0.3.10)
- 增加 DatePicker 组件增加 confirm slot，用于自定义底部的确认栏 [Demo](/components/date-picker#自定义确认栏)
- 增加 DatePicker 组件增加 cell scopedSlot，用于自定义日期单元格内容 [TT](https://tt.sankuai.com/ticket/detail?id=7583247)
- 增加 FormItem 组件增加 error scopedSlot，用于自定义错误提示的展示 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/7423671)
- 增加 Message、Confirm、Notify 增加 getPopupContainer 属性，用于配置挂载点 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/6990429)
- 增加 Cascader 组件支持 reserve-keyword 属性，用于配置多选搜索时是否保留搜索关键词 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/7227389)
- 调整 Cascader 组件在 expandTrigger='hover' 时展开灵敏度 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/7263202)

#### Bugfix
- 修复 Picker 组件在设置 multiple & max-count 时初始化报错 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/6710867)
- 修复 Picker 组件在全选时会选中 disabled 项问题[Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/6875139)
- 增加 Picker、AutoComplete 组件在 options 项变化会重新计算当前下拉的位置，解决在异步加载过程中的展示不全问题
- 修复 SubMenu 组件 tooltipProps 属性类型声明错误
- 修复 Textarea 组件在错误态时样式优先级错误，现在会优先展示错误态样式 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/6690100)
- 修复 Table 组件在设置 height / max-height 时，展开 / 收起行时表格无法滚动问题 [TT](https://tt.sankuai.com/ticket/detail?id=7304771)
- 修复 Table 组件在 safari 浏览器下宽度设置不生效问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/7533564)
- 修复 Cascader 组件远程搜索时将 loading 属性改为 true 时的报错问题 [TT](https://tt.sankuai.com/ticket/detail?id=6937002)
- 修改 FormItem 组件 showMessage 属性优先级，现在会优先使用 FormItem 上的 showMessage 属性值 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/7135973)
- 修复 Input 组件会将 undefined 值展示成字符串 undefined [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/7464903)
- 修复 DatePicker 组件在 value-format="timestamp" 下解析手动输入的内容错误 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/7287793)
- 修复 DatePicker 组件在 type='datetime' 且 keep-alive 时重新激活无法选择时分秒的问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/7142006)



## 0.3.9
`2020-08-04`
#### Feature
- 增加 Cascader 组件支持自定义选项内容 [TT](https://tt.sankuai.com/ticket/detail?id=6421688)
- 增加 FormItem 组件支持 label-position 属性，用于设置标签位置 [TT](https://tt.sankuai.com/ticket/detail?id=6337276)
- 增加 Select 组件支持 default-active-first-option 属性，用于设置默认高亮第一个选项 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/6305107)
- 增加 DatePicker 组件支持 type='monthrange'，用于设置月范围选择 [Demo](http://mtdui.sankuai.com/mtd/vue/components/date-picker#%E9%80%89%E6%8B%A9%E6%97%A5%E6%9C%9F%E6%AE%B5)
- 增加 TimePicker 组件支持 type='timerange'，用于设置时间范围选择 [Demo](http://mtdui.sankuai.com/mtd/vue/components/time-picker#%E5%9F%BA%E7%A1%80%E6%A0%B7%E5%BC%8F)
- 增加 Tree 组件支持 disabled-strictly 属性，用于设置子节点是否继承父节点的禁用状态 [TT](https://tt.sankuai.com/ticket/detail?id=6410822)
- 修改 Table 组件拖拽列宽时样式，去除对 bordered 属性的依赖 [Demo](http://mtdui.sankuai.com/mtd/vue/components/table#%E5%8F%AF%E4%BC%B8%E7%BC%A9%E5%88%97)

#### Bugfix
- 修改 InputNumber 组件在 value 值错误或空的情况下从空字符改为 null [TT](https://tt.sankuai.com/ticket/detail?id=6388676)
- 修复 DatePicker 组件在多选模式下默认月份展示日期错误 [TT](https://tt.sankuai.com/ticket/detail?id=6626554)
- 修复 DatePicker 组件在动态切换 type 时模板显示错误问题 [TT](https://tt.sankuai.com/ticket/detail?id=6509368)
- 修复 Tabs 组件在初值为 TabDrop 组件值时导航栏展示错误 [TT](https://tt.sankuai.com/ticket/detail?id=6561851)
- 修复 Cascader 组件 no-data-text 属性超长时不换行问题 [TT](https://tt.sankuai.com/ticket/detail?id=6392757)
- 修复 Carouel 组件外部容器宽度更新后展示样式错误问题 [TT](https://tt.sankuai.com/ticket/detail?id=6313680)
- 修复 Pagination 组件快速跳转未校验小于 1 的数 [TT](https://tt.sankuai.com/ticket/detail?id=6395490)
- 修复 Anchor 组件点击跳转时丢失 query 参数的问题

## 0.3.8
`2020-07-08`
#### Breaking Changes
- 修改 Carousel 组件左右切换按钮 dom 结构调整 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/6130329)
- 调整 Tabs 组件垂直型样式选择器优先级，解决嵌套 Tabs 组件样式问题 [TT](https://tt.sankuai.com/ticket/detail?id=6213169)

#### Feature
- 增加 Table 组件支持 expandOnClickTr 属性，用于支持点击整行展开
- 增加 Form 组件 resetFields 方法支持 props 参数 [API](http://localhost:8081/components/form#form-methods)
- 增加 Form 组件支持 first-fields 属性，用于配置 async-validator 的校验错误逻辑 [API](https://github.com/yiminghe/async-validator#options)
- 增加 Button 组件 href、to、target 属性 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/5795663)

#### Bugfix
- 修复 TabDrop 组件动态更新后不显示问题 [TT](https://tt.sankuai.com/ticket/detail?id=5836218)
- 修复 DatePicker 组件周选择日期展示错误[TT](https://tt.sankuai.com/ticket/detail?id=6221219)
- 修复 Autocomplete 组件 blur 事件触发时机错误 [TT](https://tt.sankuai.com/ticket/detail?id=6053211)
- 修复 Picker 组件按需引入时对 Option 组件的依赖报错 [TT](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/5953349)
- 修复 Cascader 组件不打开下拉面板问题 [TT](https://tt.sankuai.com/ticket/detail?id=5934989)

## 0.3.7
`2020-06-08`
#### Hotfix
- 修复 Types 定义错误

## 0.3.6
`2020-06-08`

#### Feature
- 增加 Popconfirm 组件 [文档](https://mtdui.sankuai.com/mtd/vue/components/popconfirm)
- 增加 TableColumn 组件 expand scopedSlot，用于支持非树形结构时自定义展开按钮 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/5539732)
- 增加 Confirm 组件增加静态 closeAll 方法 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/5646840)
- 增加 Timepicker 组件支持只显示小时 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/5637299)
- 增加 Form 校验规则 rule.validator 函数参数从 validator(rule, value, callback) 改为 validator(rule, value, callback, source) [TT](https://tt.sankuai.com/ticket/detail?id=5673493)、[文档](http://mtdui.sankuai.com/mtd/vue/components/form#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)

#### Bugfix
- 修复 Tag 组件 rounded 属性在 size='large' 时不生效问题
- 修复 Tree 组件在配置 props、draggable 后拖拽数据不正确问题
- 修复 InputGroup 组件在 Form 中样式错误[TT](https://tt.sankuai.com/ticket/detail?id=5805274)
- 修复 Confirm 组件在 message 为 VNode 时 title 属性不生效问题 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/5637282)
- 修复 Form 组件样式问题 [TT](https://tt.sankuai.com/ticket/detail?id=5805274)

## 0.3.5
`2020-05-18`
#### Feature
- 增加 Tree 组件支持 getNode 方法
- 增加 Picker 组件 noMatched slot，用于自定义无匹配项时展示 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/5403885)
- 增加 Picker 组件支持 formatter 属性，用于自定义选中展示
- 增加 Picker、Select 组件 value 值支持 boolean 类型[]
- 增加 InputGroup 组件支持 append、prepend slot [TT](https://tt.sankuai.com/ticket/detail?id=5247453)
- 增加 Table 组件支持自定义展开按钮 [TT](https://tt.sankuai.com/ticket/detail?id=5537759)
- 增加 Carousel 组件支持 speed 属性，用于设置动画速度，单位毫秒
- 更新 MTDUI 2.0 Icon，[详细更新日志](https://km.sankuai.com/page/147771037)
#### Bugfix
- 修复 Cascader 在远程搜索情况下的交互错误
- 修复 Picker 组件在全选时显示数量错误 [TT](https://tt.sankuai.com/ticket/detail?id=5345248)
- 修复 DatePicker 组件在范围的情况下排序错误 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/5400085)
- 修复 按需引入时 Sidebar、Picker 组件样式依赖错误
- 修复 Input 组件 enter 事件不触发问题
- 修复 Tree 组件异步加载时在 vue 2.5.17 下报错问题 [TT](https://tt.sankuai.com/ticket/detail?id=5469066)
- 修复 Table 组件在树形表格下配置 sortable='custom' 仍然排序问题
- 修复 TabDrop 组件在无内容时报错 [Ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/5586124)
- 修复 Drawer 组件在 keep-alive 下不能打开问题 [TT](https://tt.sankuai.com/ticket/detail?id=5586415)

## 0.3.4
`2020-04-22`
#### Feature
- 增加 Sidebar 组件增加 theme 组件支持 [TT](https://tt.sankuai.com/ticket/detail?id=5136520)
- 增加 Table 组件支持 default-expand-all 属性 [TT](https://tt.sankuai.com/ticket/detail?id=5127221)
- 增加 Input 组件支持 enter 事件 [API](http://mtdui.sankuai.com/mtd/vue/components/input#input-events)
- 增加 FormItem 组件支持 use-html-message 属性，用于配置使用 HTML 格式展示错误提示 [TT](https://tt.sankuai.com/ticket/detail?id=5104506)
- 增加 Select 组件增加 scroll、scroll-bottom 事件 [API](http://mtdui.sankuai.com/mtd/vue/components/select#select-events)
- 增加 Select 组件在 multiple 下支持 value 为 null [TT](https://tt.sankuai.com/ticket/detail?id=5224011)

#### Bugfix
- 修改 Picker 组件查询逻辑，现在首次打开面板将会触发查询逻辑 (同 Select 组件)。
- 修复 DatePicker 组件通过代码更改 value 为 null 会触发 change 事件的问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/5112593)
- 修复 Cascader 组件在未打开下拉菜单时点击清空不触发事件问题 [TT](https://tt.sankuai.com/ticket/detail?id=5193872)
- 修复 Sidebar 在初始配置为 :collpase="true" default-expanded-keys 不为空时报错问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/5234180)
- 修复 Table 组件在固定列的情况下无法展开过滤下拉问题 [TT](https://tt.sankuai.com/ticket/detail?id=5175728)
- 修复 Drawer 组件在无 title 时仍会渲染 `.mtd-drawer-header` 节点问题，现在在无 title 的情况下将不会渲染 `.mtd-drawer-header` 节点

## 0.3.3
`2020-03-31`
#### Feature
- 增加 Tree 组件增加 getCheckedNodes、getHalfCheckedNodes 方法
#### Bugfix
- 修改 下拉默认配置，现在在小屏的情况下将优先将内容展示全，在滚动出视口时下拉将固定在窗口顶部
- 修改 Table 组件在多选时表头中 checkbox 状态的判断逻辑，现在的状态判定会先剔除不可选的行[TT](https://tt.sankuai.com/ticket/detail?id=4750950)
- 修复 Cascader 组件在多选情况下点击 tag 删除选项报错问题
- 修复 TabDrop 组件在第一次选中时内容空白问题 [TT](https://tt.sankuai.com/ticket/detail?id=4940896)
- 修复 Autocomplete 补全交互问题 [TT](https://tt.sankuai.com/ticket/detail?id=5021578)

## 0.3.2
`2020-03-17`
#### Breaking Changes
- MTDUI 2.0 主题色板变更，主色从 <span style="display: inline-block;width: 14px; height: 14px;background-color: #1C6CDC;"></span>`#1C6CDC` 变更为 <span style="display: inline-block;width: 14px; height: 14px;background-color: #0A70F5;"></span>`#0A70F5`，详细变动请查看 [wiki](https://km.sankuai.com/page/147289627) [PR](http://dev.sankuai.com/code/repo-detail/SS/mtd-vue/pr/96/diff?codeArea=bj)
#### Feature
- 增加 Table 组件支持树形结构及相关配置
#### Optimization
- 调整 Cascader 在多选可搜索情况下清空按钮逻辑，现在会优先清空搜索条件，后清空当前值
#### Bugfix
- 修复 Cascader 在多选情况下 formatter 属性参数错误
- 修复 Cascader 组件在 changeOnSelect="true"、 expandTrigger="hover" 时交互错误，现在只有点击菜单项时才能触发选中 [TT](https://tt.sankuai.com/ticket/detail?id=4736091)
- 修复 Tree 组件拖拽事件 `node-drag-over` 事件名错误
- 修复 0.3.1 组件更新带来的 ssr 报错
- 修复 Select 组件在点击清空按钮后，下拉菜单选项显示错误 [TT](https://tt.sankuai.com/ticket/detail?id=4680739)

## 0.3.1
`2020-02-24`
#### Feature
- 增加 Picker 组件
- 增加 Select、Cascader、DatePicker 组件增加 focus、blur 方法
- 增加 Tree 组件支持拖拽
- 增加 Textarea 组件支持 autosize 属性
- 增加 TableColumn 组件增加 show-filter-actions 属性，用于配置单选过滤时是否显示操作按钮 [TT](https://tt.sankuai.com/ticket/detail?id=4306801)

#### Bugfix
- 修复 Textarea 组件 disabled 时样式错误
- 修复 Radio 组件在小空间下样式错误
- 修复 Steps 组件在 air 屏下连接线消失问题
- 修复 Button 组件 type='text-primary' 时 MTDUI 1.0 主题 hover 样式错误
- 修复 MenuItem 触发两次 select 事件问题 [TT](https://tt.sankuai.com/ticket/detail?id=4387799)
- 修复 TabPane 组件 slots.label 与视图不同步问题
- 修复 Form 组件当没有 FormItem 时调用 validate 返回的 promise 不会正常结束问题 [TT](https://tt.sankuai.com/ticket/detail?id=4359575)
- 修正 Select 组件在远程搜索、focus 时 remote-method 函数参数为 undefined 问题，正常应该为空字符串
- 修复 DatePicker 组件在 range 或多选时初值为 null 报错问题

## 0.3.0
`2020-01-07`
#### Breaking Changes
- 新增 MTDUI 2.0 主题，接入方式请查看 [MTDUI 2.0 主题接入](http://mtdui.sankuai.com/mtd/vue/doc/getting-started)
  - 变更组件主题变量，基础变量保持兼容，详细变动查看 [code](http://dev.sankuai.com/code/repo-detail/SS/mtd-vue/pr/89/diff?codeArea=bj&currentPath=components%2Ftheme-chalk%2Fcommon%2F_var.scss)
  - 更新 Tabs 组件样式，更改内部 padding 位置
- 修改 theme-chalk 主题中 Table 表格组件表头背景色从 `#edf0f7` 改为 `rgba(237, 240, 247, 0.5)`
#### Feature
- 增加 Select 组件 reserve-keyword 属性，用于多选可搜索时保留搜索关键字 [TT](https://tt.sankuai.com/ticket/detail?id=4013044)
- 增加 Table 组件 highlight-current-row 属性，用于配置是否高亮当前行
- 增加 TableColumn 组件 resizable 属性，需要在 Table 组件上配置 :bordered='true'，用于配置当前列是否可以通过拖动改变宽度
- 增加 Table 组件 overflow-selector 属性，用于获取内容超长的元素，用获取到的元素来判断是否展示超长 tooltip，超出内容宽度时即展示文字提示 [TT](https://tt.sankuai.com/ticket/detail?id=4121738)
- 增加 DatePicker 组件 shortcuts 插槽，用于配置左侧快捷面板 [TT](https://tt.sankuai.com/ticket/detail?id=4039928)
- 增加 Popover、Tooltip 组件当 close-delay=0，trigger='hover' 时不能移入提示内容中 [TT](https://tt.sankuai.com/ticket/detail?id=4057761)
#### Bugfix
- 修复 Table 组件在远程排序时仍然会触发内置排序的问题 [TT](https://tt.sankuai.com/ticket/detail?id=4096755)
- 修复 Select 组件在 :auto-clear-query="true" 且有 options 时默认不展开列表问题 [TT](https://tt.sankuai.com/ticket/detail?id=4075330)
- 修复 DatePicker 在 type='week' 时选中样式错误 [TT](https://tt.sankuai.com/ticket/detail?id=4099461)
- 修复 DatePicker 在 value-format='timestamp' 时清空报错 [TT](https://tt.sankuai.com/ticket/detail?id=4077439)
- 修复 Notification types 定义不全问题 [TT](https://tt.sankuai.com/ticket/detail?id=4136824)
- 修复 Autocomplete 在 trackpad 为点击时无法选中问题 [TT](https://tt.sankuai.com/ticket/detail?id=4125862)
- 修复 Timepicker 组件下拉时间面板没有滚动选中值问题 [TT](https://tt.sankuai.com/ticket/detail?id=4168542)

## 0.1.45
`2019-12-18`
#### Feature
- 增加 DatePicker 组件 type='week' 配置
- 修改 Table 组件在 data 仅内容变化时会保留选中状态，在 data 引用地址变化时才清空选中状态
- 修改 Table 组件 expand-change 事件，增加 extra.expanded 参数
#### Bugfix
- 修复 Table 在远程排序下，点击表头排序方式一直为 'ascending' 的问题 [TT](https://tt.sankuai.com/ticket/detail?id=3962543)
- 修复 Casacder 在远程搜索的情况下不会自动展开已选项路径问题 [TT](https://tt.sankuai.com/ticket/detail?id=3948217)
- 修复 DatePicker 需要点击两次才能关闭面板问题 [TT](https://tt.sankuai.com/ticket/detail?id=3949144)
- 修复 DatePicker 在配置 value-format=timestamp 后 value 为空数组时打不开面板问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3937935)
- 修复 Form 组件 validator 方法 callback 参数 types 定义错误 [TT](https://tt.sankuai.com/ticket/detail?id=3996204)
- 修复 MenuItem 组件在 Vue 2.6.11 下警告报错 [TT](https://tt.sankuai.com/ticket/detail?id=4020772) [TT](https://tt.sankuai.com/ticket/detail?id=4026992)
- 修复 Tabs 组件在 TabPane 中使用 v-if 会导致内容不显示的问题 [TT](https://tt.sankuai.com/ticket/detail?id=4028083)

## 0.1.44
`2019-12-02`
#### Feature
- 增加 Datapicker 组件 value-format 属性
- 增加 Select 组件 maxTagPlaceholder scopedSlot 用于自定义隐藏 tag 时显示的内容
- 增加 Table 组件支持自定义 filter 及 filter-dropdown [ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/3785276)
- 增加 Tree 组件 baseIndent 属性，用于设置基础缩进。
#### Optimization
- 修改 Cascader 组件支持搜索时面板不定高
- 修改 Poppover 组件 trigger 为 click 时，绑定的事件由 click 事件改为 mousedown 事件。 [TT](https://tt.sankuai.com/ticket/detail?id=3846583)
- 修改 Table 空数据判断逻辑，如果过滤后展示数据为空也会显示空数据状态。
#### Bugfix
- 修复 Tree 组件 tree-expand-all 属性在配置 props.children 下不生效问题  [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3823394)
- 修复 Cascader trigger 为 hover 时可以选中父级问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3821256)
- 修复 Table 组件 fixed 时筛选头显示错误且横向滚动不跟随问题 [TT](https://tt.sankuai.com/ticket/detail?id=3889391)
- 修复 Table 组件切换 data 时 selection 不清空问题
- 修复 Popper 组件在 keep-alive 模式下快速销毁时可能面板不销毁问题 [TT](https://tt.sankuai.com/ticket/detail?id=3892540)
- 修复 Tabs 组件动态创建 tab-pane 时 slot 内容无法展示问题 [TT](https://tt.sankuai.com/ticket/detail?id=3877901)
- 修复 Loading 组件 delay 属性在 mounted 时不生效问题 [TT](https://tt.sankuai.com/ticket/detail?id=3877520)

## 0.1.42
`2019-11-13`
#### Feature
- 增加 Confirm 组件 onOk、onCancel 返回类型为 Promise 时等待 resolve 后自动关闭弹窗的功能
- 增加 Confirm 组件 getPopupContainer 属性，用于获取挂载的父级元素节点
- 增加 Modal 组件增加 opened 事件，同时修改 closed 事件触发时机。opened、closed 事件触发时机分别对应显示动画完成后、隐藏动画完成后
- 增加 Upload 组件 element-id 属性，用于设置内部 input 节点的 id
- 增加 Datepicker 组件 default-time 属性支持当 type='date' 时设置默认时分秒
#### Bugfix
- 修改 TableColumn 对是否可搜索的判断逻辑，从判断 filterMethod 属性存在改为判断 filters 属性存在或 filterMethod 属性存在
- 修改 Icon 组件 name 属性为必填
- 修复 InputNumber 组件 value 为 null 时会显示上一次的值
- 修复 Table 组件嵌套列动态销毁时渲染错误 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3768283)
- 修复 MenuItem 组件 disabled 属性对内部 a 标签失效问题
- 修复 Tabs 组件在某些场景下挂载报错，详见 [ones](https://tt.sankuai.com/ticket/detail?id=3747238)

## 0.1.41
`2019-10-25`
#### Optimization
- 优化 Table 组件 hover 性能
#### Feature
- 增加 Table 组件增加 filters、filter-method 等属性 [ones](https://ones.sankuai.com/onesproduct/4348/iterationdetail/28513)
- 修改 Autcomplete 组件 select 事件触发时机，现在点击选项时就会触发 select，不在判断是否与当前 value 相同 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3491886)
#### Bugfix
- 修复 Select 组件为 multiple=true、value 为 object 且 value-key 后 input 事件参数错误 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3491886)
- 修复 Transfer 穿梭框组件可搜索情况下列表项过多时滚动不到底部 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3537853)
- 修复 Transfer 穿梭框组件单行超长会重叠，现在超长会出现省略号 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3537841)
- 修复 DatePicker 组件校验 warn [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3554301)

## 0.1.40
`2019-10-10`
#### Feature
- 增加 Button 组件增加 ghost 属性，用于设置幽灵按钮
- 增加 Tree 组件支持 props 属性，用于自定义数据源字段名
- 增加 ColorPicker 组件增加 update:visible 事件
- 增加 Modal 组件增加 open 事件
- 增加 Table 组件增加 disable-mouse-event 属性，用于取消响应 mouse 相关事件监听
- 增加 Table 组件增加 show-summary、sum-text、summary-method 属性，用于显示合计表尾
- 增加 Popover 组件增加 title 属性及 slot
- 增加 Fonts 增加 eot 格式字体
#### Bugfix
- 修复 单组件引入 MenuItem 时缺少 Tooltip 组件依赖报错
- 修复 Table 组件 select 事件参数错误
- 修复 Option 组件当 label 为 0 时不显示问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3316617)
- 修复 Carousel 组件切换报错 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/list?filterId=128&cn=1&openDrawerIssueId=3494160&openDrawerProjectId=4348)

## 0.1.39
`2019-09-19`
#### Feature
- 增加 单独引入样式文件中 base.css 增加 icon.css 依赖
- 增加 InputGroup 组件，用于输入框组合，详细查看 [文档](http://ss.sankuai.com/mtd/vue/components/input)
- 增加 Autocomplete 组件在混合输入 (如：中文输入) 过程中不在触发 search 事件
- 新增 Form 组件 clearValidate 方法
#### Bugfix
- 修复 Form 组件动态改变 rules 时控制台报 promise not catch 错误
- 修复 FormItem 组件 helper 在右侧时样式错误
- 修复 Tabs 组件当 $slots.default 为空时报错
- 修复 Transfer 组件按钮样式错误

## 0.1.38
`2019-09-04`
#### Bugfix
- 修复 Table 组件销毁时报错

## 0.1.37
`2019-09-04`
#### Feature
- 增加 DatePicker 组件 增加 default-time 用于设置选中日期后的默认具体时刻 [ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/2879555)

#### Bugfix
- 修复 TabPane 组件 value 值不支持 number 类型问题 [ones 1](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3212256)、[ones 2](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3209590)
- 修复 Cascader 组件 disabled 时仍然能够展开问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3209596)
- 修复 DatePicker 组件在 type='datetimerange' 时，如果选择同一天时，选择时间交互错误 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3167759)
- 修复 Textarea 组件 disabled 样式错误
- 修复 Table 组件在 TableColumn[type='selection'] 时，点击 checkbox 仍然触发 row-click 事件问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3209594)

## 0.1.36
#### Feature
- 增加 按需引入的样式文件增加依赖组件样式，如：select.css 中将包含 input.css 中全部样式。
  采用按需引入方式的用户可使用 cssmin 来去除重复的样式
- 增加 Table 组件增加 tooltip-class 属性用于设置超出显示 tooltip 的 class
#### Bugfix
- 修复 Drawer 组件 title slot 失效问题
- 修复 Select 组件在 Vue 2.5.x 下 multiple 时搜索条件输入闪动问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3016033)
- 修复 Select 组件在 value 为 object 时远程搜索情况下下拉面板选中状态显示错误 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3157471)

## 0.1.35
`2019-08-19`
#### Bugfix
- 修复 Input 组件 prepend, append 样式错误
- 修复 Carousel 组件自适应宽度错误

## 0.1.34
`2019-08-14`
#### Feature
- 增加 Table 增加 show-overflow-tooltip、tooltip-props 属性用于设置超出显示 tooltip
- 修改 Cascader 组件输入框超出显示省略
#### Bugfix
- 修复 Button 按钮 loading 状态下样式
- 修复 Select 组件 show-checkbox 在 vue 2.6.x 下重复点击 bug

## 0.1.32
`2019-08-08`
#### Feature
- 增加 Announcement 公告增加 info 类型
- 增加 Tooltip, Popover, Dropdown 组件增加 updatePopper 方法，用于手动更新弹出层位置
- 增加 Select 选择框组件增加 show-checkbox 属性，用于配置在多选情况下是否显示复选框
- 修改 Slider 滑块组件中滑块样式，从按钮改为圆形
#### Bugfix
- 修复 InputNumber 数字输入框圆角样式错误
- 修复 Tabs 标签页组件无内容时报错
- 修复 Button 按钮组件当 icon 与 文字不一样大时不对齐问题
- 修复 Carousel 走马灯组件点击切换时仍然定时切换
- 修复 Checkbox 复选框组件在 FormItem 中对齐问题
- 删除 TimelineItem 组件 type=solid 类型 (solid 类型将以默认类型展示)

## 0.1.31
`2019-07-25`
#### Feature
- 增加 Popover、Tooltip 箭头自适应
- 增加 Cascader 点击 icon 展开
- 增加 Table 切换 table 数据时自动重置展开状态
#### Bugfix
- 修复 Popover、Tooltip 在 keep-alive 情况下触发触发 deactivated 后有仍然显示
- 修复 Menu 模板中存在空格而导致未对齐问题 [ones](https://ones.sankuai.com/v2/ones/product/4348/workItem/defect/list?filterId=128&cn=1&openDrawerIssueId=2873061)
- 修复 FormItem 组件在内嵌模式下底部间距问题
- 修复 Tabs 组件在 $slots.label 变化后，下方状态横线位置不正确问题 [ones](https://ones.sankuai.com/v2/ones/product/4348/workItem/defect/list?filterId=128&cn=1&openDrawerIssueId=2928942)

## 0.1.30
`2019-07-10`
#### Bugfix
- 修复 Tab 组件在 size=‘small’, type=‘border-card’, closable 配置下，hover tab-item 会导致抖动问题[ones](https://ones.sankuai.com/v2/ones/product/4348/workItem/defect/detail/2857771)
- 修复 Select 组件在输入中文过程中按下回车会导致已有项取消选中 [ones](https://ones.sankuai.com/v2/ones/product/4348/workItem/defect/detail/2860692)

## 0.1.28
`2019-06-20`
#### Feature
- 增加 Menu 菜单组件
- 增加 Carousel 走马灯组件
#### Bugfix
- 修改 Sidebar 交互
  - 由于菜单项更换为 menu 组件，故产生交互变更 (主要在 collapse 状态下交互改变)
- 修复 Select 组件 blur 事件触发时机错误
- 修复 Input 组件 prepend、append 插槽中 select 样式错误

## 0.1.27
`2019-06-20`
#### Feature
- 增加 Table 增加 loading、loading-message 属性
- 增加 Table 增加 sort-orders 属性用于自定义排序策略的顺序
- 增加 Select 增加 auto-clear-query 属性支持前端搜索
#### Optimization
- 修改 Tabs 组件 value 属性改为受控，目前未提供 input 事件时仍按原有逻辑处理，但会发出警告
- 修改 TabPane 组件 value 属性为必填项，目前仅提示，处理逻辑和原有暂时保持一致
- 修改 弹出类组件在超出顶部视口时的处理方式改为跟随滚动
#### Bugfix
- 修复 Select 在前端搜索时定位错误 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2767676)
- 修复 Tab 组件翻页滚动错误 [ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/2718196)
- 修复 Tab 组件在 Vue 2.6+ 下使用 v-slot:label 语法未正常显示问题 (不影响 slot='label' 语法)。
- 修复 Tabs 标签页组件动态挂载 tab-pane 组件导致显示顺序错误 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2748183)
- 修复 Anchor 组件在多页面应用下需要点击两次才能滚动到正确问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2750226)


## 0.1.26
`2019-06-14`
#### Feature
- 增加 DatePicker、TimePicker 增加 popperClass 属性
#### Optimization
- 修改 Autocomplete 组件在 focus 时如果有可选项则显示下拉
#### Bugfix
- 修复 vue 2.6+ 下 keep-alive 时 Tooltip 组件重新 activated 后无法显示问题
- 修复 DatePicker 在 type='datetimerange' 时配置 value 值，直接点击 TimePicker 值不更新问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/2733418)


## 0.1.25
`2019-06-06`
#### Feature
- 增加 Drawer 抽屉组件
- 增加 Modal 组件 footer 插槽内增加选择器为 .mtd-btn + .mtd-btn 的元素间距

#### Bugfix
- 修复 InputNumber 组件当 precision 为 0 时，仍然能够输入小数问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2699642)

## 0.1.24
`2019-05-30`
#### Feature
- 增加 Affix 固钉组件
- 增加 Anchor 锚点组件
- 增加 InputNumber 数字选择器组件
- 增加 CheckboxGroup 增加 max、min 属性
#### Bugfix
- 修复 Select 组件使用系统中文输入法时获取到的搜索条件与实际不符问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2596420)
- 修改 Select 组件的 click.stop 为 click，以修复 Select 之外的下拉不能正常收起的问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2643493)

## 0.1.23
#### Feature
- 增加 Rate 评分组件
- 增加 Tree 组件 default-expand-all 属性，用于默认展开所有节点
- 增加 Tabs 增加 resize 事件监听
#### Bugfix
- 修复 Tabs 嵌套时，内部 tabs 样式错误 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2580077)
  - 将 card、border-card 类型时 tab-item 样式权重提升
- 修复 单独引入 Message 组件报错 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2584816)
- 修复 Select 组件多选情况下 tag 超长导致换行问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2568876)
  - 将 tag 组件由 display: inline-block 改为 inline-flex


## 0.1.21
`2019-05-09`
#### Feature
- 增加 Cascader 级联组件
- 移除 Popper 组件 popperOptions 属性默认值中 preventOverflow.enable = false
#### Bugfix
- 修复 Select 在 multiple 为 true 时 blur 事件丢失 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2518756)
- 修复 Select 配置 formatter 属性对 placeholder 不生效问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2527223)
- 修复 Upload 组件删除文件时动画丢失
- 修改 RadioGroup、RadioButton、Select 组件的对齐方式为 baseline
- 修改 Tabs、Input 组件在 ie10 下样式显示错误

## 0.1.20
`2019-04-28`
#### Bugfix
- 修复 Select 组件远程搜索结果一直显示未匹配问题。(0.1.19版本引入)
- 修复 Tabs closable 属性失效问题。(0.1.19版本引入)

## 0.1.19
`2019-04-26`
#### Feature
- 增加 Card 组件
- 增加 ColorPicker 组件
- 增加 DatePicker 增加 show-btn-now 属性，用于设置此刻按钮是否显示 [ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/2046787)
- 增加 Select 增加 is-empty 属性，用于手动设置是否是空数据状态 [ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/2037971)
- 增加 Select 增加 formatter 属性，用于格式化当前输入框中显示的内容 [ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/2060742)
#### Bugfix
- 修复 Confirm 组件 挂载时没有使原有元素失去焦点 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/2095832)

## 0.1.18
`2019-04-22`
#### Feature
- 增加 AutoComplete 组件
- 增加 TabPane 组件支持 closable 属性
#### Bugfix
- 修复 Select 多选可搜索情况下，输入中文过程中被遮挡问题
- 修复 Select 组件在 option 销毁的情况下，仍然能通过 enter 键选中问题
- 修复 TableColumn 组件 prop 属性名为 'xxx.xxx' 取不到值问题 [TT](https://tt.sankuai.com/ticket/detail?id=2008110)
- 修复 Tabs 组件初始化时滚动位置显示错误

## 0.1.17
`2019-04-11`
#### Feature
- 增加对 [vscode 插件](https://km.sankuai.com/page/140681611)支持
#### Bugfix
- 修复 Select 组件 value-key 属性在初始值时不生效问题

## 0.1.16
`2019-04-01`
#### Feature
- 增加 Grid 栅格组件
- 增加 Upload 组件增加 show-file-down 配置 [ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/1883465)
- 增加 Select 组件增加 closeable 为 function 支持 [ones](https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/1883531)
#### Bugfix
- 修复 Select 组件在多选下拉框关闭但焦点未移除情况下 enter 键能够删除当前选项问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/1873233)
- 修复 DatePicker 在 type=datetimerange 下 tiemPickerOptions 失效问题 [ones](https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/1880784)
- 修复 Pagination 在初始页码过大时触发 change 事件
- 增加 [mtd-vue-helper](https://github.com/yangWare/mtd-vue-helper-md) VScode 插件支持

## 0.1.15
`2019-03-22`
#### Feature
- 增加 分页组件 simple 属性
#### Bugfix
- 修复 嵌套 FormItem 样式错误
- 修复 DatePicker 在 type 为 datetimerange 下配置 format 后内部 input 值显示错误
- 添加 Container 组件，包含: Container、Main、Aside、Header、Footer

## 0.1.14
`2019-03-06`
#### Feature
- 增加 加载组件
- 增加 日期选择增加 pick-range 事件
- 修改 侧栏组件样式
#### Bugfix
- 修复 分页组件无法切换每页显示条数 bug，[ones](https://ones.sankuai.com/ones/product/4348/defectdetail/1670679)

## 0.1.12-aplha
`2019-02-25`
#### Feature
- 增加 时间轴组件
- 增加 侧边栏组件

## 0.1.11
`2019-02-21`
#### Bugfix
- 修复 Select 组件混合输入时 query 事件不触发，[ones](https://ones.sankuai.com/ones/product/4348/defectdetail/1530200)
- 修复 单组件包依赖解析错误
- 修复 进度条样式

## 0.1.10
`2019-02-13`
#### Feature
- 增加 穿梭框组件
- 增加 上传组件
- 增加 树组件
- 增加 Table 组件增加 `cell-mouse-enter`、`cell-mouse-leave`、`row-mouse-enter`、`row-mouse-leave` 事件
#### Bugfix
- 修复 Pagination 快速翻页按钮点击失效问题
- 修复 Select 组件在 disabled、closeable 状态 tag 可以删除问题
- 修复 Select 组件在 options 列表为空的情况下默认值不显示问题
- 修改 Select 组件在 disabled 状态下样式
- 修改 RadioGroup 仅在 value 值改变的情况下发送 input 事件。
- 修复 Tabs 组件动态改变激活项的 label 值时不会重新计算底部 silder 的大小
- 修复 Modal 组件在 keep-alive 模式下销毁后不能显示问题
- 修改 Modal 组件 mask-closable	 属性 (点击蒙层是否允许关闭) 默认值从 true 改为 false

## 0.1.9
`2019-01-17`
#### Feature
- 增加 Tree 组件支持基础的折叠展开及复选
#### Bugfix
- 修复 Table checkable 属性不生效问题
- 修改 Table empty 插槽由 absolute 改为 flex.<br>
  影响 如果设置过 Table height 的用户 empty 插槽内容将不会垂直居中。
- 修复 TableColumn 组件属性不支持动态改变
- 新增 TableColumn type='selection' 时 selection scopedSlot 增加 row、$index 参数
- 修复 Input change 时间剔除原生 change 事件
- 修复 Notification 组件 message 为 vnode 时报错
- 更新 更新 @vue/test-utils 依赖包版本
- 修改 统一目录，将 packages 目录更改为 components 目录
  影响 所有使用 scss 版本样式的用户，不影响 css 版本用户。
  需要将
  ```
  $icon-font-path: '~@ss/mtd-vue/packages/theme-chalk/fonts';
  @import "@ss/mtd-vue/packages/theme-chalk/index.scss";
  ```
  改为
  ```
  $icon-font-path: '~@ss/mtd-vue/components/theme-chalk/fonts';
  @import "@ss/mtd-vue/components/theme-chalk/index.scss";
  ```
