# DatePicker / 日期选择器
<span>{{$t('datepicker.component_desc')}}</span>

## {{$t('datepicker.module1.title')}}
<span>{{$t('datepicker.module1.desc1')}}</span>
:::include(src="./doc/base.vue")
:::

## {{$t('datepicker.module2.title')}}
<span>{{$t('datepicker.module2.desc1')}}</span>
:::include(src="./doc/month.vue")
:::

## {{$t('datepicker.module3.title')}}
<span>{{$t('datepicker.module3.desc1')}}</span>
:::include(src="./doc/year.vue")
:::

## {{$t('datepicker.module4.title')}}
<span>{{$t('datepicker.module4.desc1')}}</span>
:::include(src="./doc/daterange.vue")
:::

## {{$t('datepicker.module5.title')}}
<span>{{$t('datepicker.module5.desc1')}}</span>
:::include(src="./doc/monthrange.vue")
:::

## {{$t('datepicker.module6.title')}}
<span>{{$t('datepicker.module6.desc1')}}</span>
:::include(src="./doc/datetimerange.vue")
:::

## {{$t('datepicker.module7.title')}}
<span>{{$t('datepicker.module7.desc1')}}</span>
:::include(src="./doc/quick.vue")
:::

## API
<api-doc name="DatePicker" :doc="require('./api.json')"></api-doc>

#### DatePicker options
| name | desc | type | default |
|--- |--- |--- |--- |--- |
| shortcuts | {{$t('datepicker.api.shortcuts')}} | { text: string, value: Function, onClick: Function } | - |
| disabledDate | {{$t('datepicker.api.disabledDate')}} | boolean | - |

<style lang='scss'>
  .demo-picker-group{
    display: inline-block;
    text-align: left;
    +.demo-picker-group{
      margin-left: 60px;
    }
  }
</style>
<!-- 
## QA测试
:::include(src="./doc/test.vue")
::: -->