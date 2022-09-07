# Timeline / 时间轴
<span>{{$t('timeline.component_desc')}}</span>

## <span>{{$t('timeline.module1.title1')}}</span>
<span>{{$t('timeline.module1.desc')}}</span>

### <span>{{$t('timeline.module1.subtitle1')}}</span>
:::include(src="doc/base-right.vue")
:::

### <span>{{$t('timeline.module1.subtitle2')}}</span>
:::include(src="doc/base-left.vue")
:::

### <span>{{$t('timeline.module1.subtitle3')}}</span>
:::include(src="doc/base-around.vue")
:::

## <span>{{$t('timeline.module2.title1')}}</span>
### <span>{{$t('timeline.module2.subtitle1')}}</span>
<span>{{$t('timeline.module1.desc')}}</span>
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