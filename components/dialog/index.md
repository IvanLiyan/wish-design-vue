<style lang='scss'>
  .demo-dialog-btn-groups{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>

# Dialog / 对话框

<span>{{$t('dialog.component_desc')}}</span>

## <span>{{$t('dialog.module1.title')}}</span>

<span>{{$t('dialog.module1.desc')}}</span>

:::include(src="./doc/base.vue")
:::

## <span>{{$t('dialog.module2.title')}}</span>

### <span>{{$t('dialog.module2.subtitle1')}}</span>

<span>{{$t('dialog.module2.desc1')}}</span>
:::include(src="./doc/type.vue")
:::

### <span>{{$t('dialog.module2.subtitle2')}}</span>

<span>{{$t('dialog.module2.desc2')}}</span>
:::include(src="./doc/async-close.vue")
:::

### <span>{{$t('dialog.module2.subtitle3')}}</span>

<span>{{$t('dialog.module2.desc3')}}</span>
:::include(src="./doc/custom.vue")
:::

## API

<api-doc name="Dialog" :doc="require('./api.json')"></api-doc>
<api-doc name="Confirm" :doc="require('../confirm/api.json')"></api-doc>
