# 布局 / Grid

<span>{{$t('row.component_desc')}}</span>

## <span>{{$t('row.module1.title')}}</span>

<span>{{$t('row.module1.desc1')}}</span>

:::include(src="./doc/base.vue")
:::

## <span>{{$t('row.module2.title')}}</span>

### <span>{{$t('row.module2.subtitle1')}}</span>

<span>{{$t('row.module2.desc1')}}</span>

:::include(src="./doc/gutter.vue")
:::

### <span>{{$t('row.module2.subtitle2')}}</span>

<span>{{$t('row.module2.desc2')}}</span>

:::include(src="./doc/mix.vue")
:::

### <span>{{$t('row.module2.subtitle3')}}</span>

<span>{{$t('row.module2.desc3')}}</span>

:::include(src="./doc/offset.vue")
:::

### <span>{{$t('row.module2.subtitle4')}}</span>

<span>{{$t('row.module2.desc4')}}</span>
:::include(src="./doc/align.vue")
:::

### <span>{{$t('row.module2.subtitle5')}}</span>

<span>{{$t('row.module2.desc5')}}</span>
:::include(src="./doc/response.vue")
:::

## API

<api-doc name="Row" :doc="require('./api.json')"></api-doc>
<api-doc name="Col" :doc="require('../col/api.json')"></api-doc>
