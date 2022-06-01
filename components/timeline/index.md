# Timeline / 时间轴
<span>用于可视化内容随时间的状态改变</span>

## 基本样式
<span>时间轴位置分为左侧、右侧及中间</span>

### 时间轴在左侧
:::include(src="doc/base-right.vue")
:::

### 时间轴在右侧
:::include(src="doc/base-left.vue")
:::

### 时间轴在中间
:::include(src="doc/base-around.vue")
:::

## 类型与用法
### 组合图标和状态
可以使用图标或指示颜色来表达时间节点事件的状态
:::include(src="doc/status.vue")
:::

<!-- 根据场景不同可以将时间节点设置为其他类型
:::include(src="doc/nodetype.vue")
::: -->
<!-- 
### 内容展示方向 <mtd-tag type='unbordered' size='small' theme="gray">属性</mtd-tag>
根据展示场景，选择不同方向的内容展示时间轴
内容在时间轴左侧
:::include(src="doc/right.vue")
:::

内容在时间轴两侧，设置 position 为`alternate`
:::include(src="doc/alternate.vue")
:::

### 最小高度 <mtd-tag type='unbordered' size='small' theme="gray">属性</mtd-tag>
设置时间轴线的最小高度 超过最小高度的部分将会高度自适应
:::include(src="doc/minheight.vue")
::: -->

## API
<api-doc name="Timeline" :doc="require('./api.json')"></api-doc>
<api-doc name="TimelineItem" :doc="require('./../timeline-item/api.json')"></api-doc>

<style>
    .demo-timeline-wrap {
        display: flex;
        justify-content: space-between;
    }
</style>