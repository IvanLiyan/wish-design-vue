# 进度条 / Progress

向用户传达特定进程的进度，告知用户当前状态和预期。

## 基础样式
:::include(src="./doc/base.vue")
:::

## 类型与用法
### 大小 <design-tag></design-tag>
:::include(src="./doc/size.vue")
:::

### 状态 <design-tag></design-tag>
进度条会根据进程情况出现成功、失败两种状态。
:::include(src="./doc/status.vue")
:::

### 环形进度条
多用于屏幕空间受限区域的进度展示。
:::include(src="./doc/circle.vue")
:::

## API
<api-doc name="Progress" :doc="require('./api.json')"></api-doc>
