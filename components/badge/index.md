# 徽章 / Badge
<span>{{$t('badge.component_desc')}}</span>

## <span>{{$t('badge.module1.title')}}</span>
<span>{{$t('badge.module1.desc1')}}</span>
<br />
<span>{{$t('badge.module1.desc2')}}</span>
<br />
<span>{{$t('badge.module1.desc3')}}</span>
:::include(src="./doc/base.vue")
:::

## <span>{{$t('badge.module2.title')}}</span>
<span>{{$t('badge.module2.desc1')}}</span>
:::include(src="./doc/usage.vue")
:::
<!-- 
### 不显示数量
只需要引导用户注意变化，不需要关注数量。
:::include(src="./doc/num.vue")
:::


### 组合样式

:::include(src="./doc/combination.vue")
::: -->

## API
<api-doc name="Badge" :doc="require('./api.json')"></api-doc>

<!-- ### 测试
:::include(src="./doc/tests.vue")
::: -->

<style>
    .example-badge {
        margin-right: 80px;
        vertical-align: middle;
    }
</style>
