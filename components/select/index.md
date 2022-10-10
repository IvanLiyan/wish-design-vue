# 选择框 / Select

<span>{{$t('select.component_desc')}}</span>

## <span>{{$t('select.module1.title')}}</span>

<span>{{$t('select.module1.desc1')}}</span>
:::include(src="./doc/base.vue")
:::

## <span>{{$t('select.module2.title')}}</span>

:::include(src="./doc/status.vue")
:::

## <span>{{$t('select.module3.title')}}</span>

### <span>{{$t('select.module3.subtitle1')}}</span>

:::include(src="./doc/default.vue")
:::

### <span>{{$t('select.module3.subtitle2')}}</span>

:::include(src="./doc/multiple.vue")
:::

### <span>{{$t('select.module3.subtitle3')}}</span>

:::include(src="./doc/search.vue")
:::

## API

<api-doc name="Select" :doc="require('./api.json')"></api-doc>
<api-doc name="Option" :doc="require('../option/api.json')"></api-doc>
