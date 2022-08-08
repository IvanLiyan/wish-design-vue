# 步骤条 / Stepper

<span>{{$t('stepper.component_desc')}}</span>

## <span>{{$t('stepper.module1.title')}}</span>

:::include(src="./doc/base.vue")
:::

## <span>{{$t('stepper.module2.title')}}</span>

### <span>{{$t('stepper.module2.subtitle1')}}</span>

:::include(src="./doc/status.vue")
:::

### <span>{{$t('stepper.module2.subtitle2')}}</span>

<span>{{$t('stepper.module2.desc2')}}</span>
:::include(src="./doc/desc.vue")
:::

### <span>{{$t('stepper.module2.subtitle3')}}</span>

<span>{{$t('stepper.module2.desc3')}}</span>
:::include(src="./doc/space.vue")
:::

### <span>{{$t('stepper.module2.subtitle4')}}</span>

<span>{{$t('stepper.module2.desc4')}}</span>
:::include(src="./doc/length-wise-direction.vue")
:::

## API

<api-doc name="Stepper" :doc="require('./api.json')"></api-doc>
<api-doc name="Step" :doc="require('./../step/api.json')"></api-doc>
