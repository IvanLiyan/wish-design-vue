<style lang="scss">
  .demo-wt-form-helper {
    font-size: 12px;
    color: #ADADAD;
    margin-left: 12px;
  }
  .demo-form-tooltip{
    margin-left: 12px;
  }
  .demo-form-title{
    text-align: left;
    font-size: 12px;
    color: #999
  }
</style>

# 表单 / Form

<span>{{$t('form.component_desc')}}</span>

## <span>{{$t('form.module1.title')}}</span>

<span>{{$t('form.module1.desc1')}}</span>

:::include(src="./doc/multiple.vue")
:::

<span>{{$t('form.module1.desc2')}}</span>

:::include(src="./doc/single.vue")
:::

## API

<api-doc name="Form" :doc="require('./api.json')"></api-doc>

### <span>{{$t('form.module2.subtitle')}}</span>

| name     | desc                                                       | type    | default |
| -------- | -----------------------------------------------------------| ------- | ------- |
| trigger  | {{$t('form.api.trigger')}}                                 | string  | -       |
| min      | {{$t('form.api.min')}}                                     | number  | -       |
| max      | {{$t('form.api.max')}}                                     | number  | -       |
| message  | {{$t('form.api.message')}}                                 | string  | -       |
| pattern  | {{$t('form.api.pattern')}}                                 | RegExp  | -       |
| required | {{$t('form.api.required')}}                                | boolean | `false` |
| validator | {{$t('form.api.validator')}}                              | function(rule, value, callback, source) | - |

<span>{{$t('form.module2.desc')}}</span>:

[async-validator](https://github.com/yiminghe/async-validator)

<api-doc name="FormItem" :doc="require('../form-item/api.json')"></api-doc>
