# 面包屑 / Breadcrumb

<span>{{$t('breadcrumb.componnent_desc')}}</span>

## <span>{{$t('breadcrumb.module1.title')}}</span>

:::include(src="./doc/base.vue")
:::

## <span>{{$t('breadcrumb.module2.title')}}</span>

<span>{{$t('breadcrumb.module2.desc')}}</span>

### <span>{{$t('breadcrumb.module2.subtitle1')}}</span>

:::include(src="./doc/title.vue")
:::

### <span>{{$t('breadcrumb.module2.subtitle2')}}</span>

:::include(src="./doc/icon.vue")
:::

## API

<api-doc name="Breadcrumb" :doc="require('./api.json')"></api-doc>
<api-doc name="BreadcrumbItem" :doc="require('../breadcrumb-item/api.json')"></api-doc>
