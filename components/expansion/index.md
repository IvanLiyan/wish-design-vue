# 伸缩框 / Expansion

<span>{{$t('expansion.component_desc')}}</span>

## <span>{{$t('expansion.module1.title')}}</span>

:::include(src="./doc/base.vue")
:::

## <span>{{$t('expansion.module2.title')}}</span>

### <span>{{$t('expansion.module2.subtitle1')}}</span>

<span>{{$t('expansion.module2.desc1')}}</span>
:::include(src="./doc/single.vue")
:::

<span>{{$t('expansion.module2.desc2')}}</span>
:::include(src="./doc/multi.vue")
:::

### <span>{{$t('expansion.module2.subtitle2')}}</span>

<span>{{$t('expansion.module2.desc3')}}</span>
:::include(src="./doc/fold.vue")
:::

## API

<api-doc name="expansion" :doc="require('./api.json')"></api-doc>
<api-doc name="expansionItem" :doc="require('../expansion-item/api.json')"></api-doc>
