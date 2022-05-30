# 时间轴 / Timeline

## 基础样式
:::include(src="doc/base.vue")
:::

## 类型与用法
### 状态提示
不同图标代表不同的状态，如完成、成功、错误、失败、告警，正在进行中或其他默认状态
:::include(src="doc/status.vue")
:::

根据场景不同可以将时间节点设置为其他类型
:::include(src="doc/nodetype.vue")
:::

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
:::

## API
<api-doc name="Timeline" :doc="require('./api.json')"></api-doc>
<api-doc name="TimelineItem" :doc="require('./../timeline-item/api.json')"></api-doc>
