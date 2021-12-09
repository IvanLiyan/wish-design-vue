<style lang="scss">
  .demo-input-container,.demo-input-group{
    display:flex;
    justify-content: center;
    margin-bottom:20px;
    &>div{
        margin-right:10px;
        &:last-child{
            margin-right:0;
        }
    }
  }
  .demo-input-group{
      justify-content: start;
  }
</style>

# 文本输入框 / Input

<span>{{$t('input.componnent_desc')}}</span>

## <span>{{$t('input.module1.title')}}</span>

### <span>{{$t('input.module1.subtitle1')}}</span>

<span>{{$t('input.module1.desc1')}}</span>

:::include(src="./doc/base-input.vue")
:::

### <span>{{$t('input.module1.subtitle2')}}</span>

<span>{{$t('input.module1.desc2')}}</span>

:::include(src="./doc/active-input.vue")
:::

### <span>{{$t('input.module1.subtitle3')}}</span>

<span>{{$t('input.module1.desc3')}}</span>

:::include(src="./doc/type-input.vue")
:::

## <span>{{$t('input.module2.title')}}</span>

### <span>{{$t('input.module2.subtitle1')}}</span>

<span>{{$t('input.module2.desc1')}}</span>

:::include(src="./doc/base-textarea.vue")
:::

### <span>{{$t('input.module2.subtitle2')}}</span>

<span>{{$t('input.module2.desc2')}}</span>

:::include(src="./doc/active-textarea.vue")
:::

### Attributes

## API

<api-doc name="Input" :doc="require('./api.json')"></api-doc>
