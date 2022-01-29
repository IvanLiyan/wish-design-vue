# DatePicker / 日期选择器
<span>{{$t('datepicker.componnent_desc')}}</span>

## {{$t('datepicker.module1.title')}}
<span>{{$t('datepicker.module1.desc1')}}</span>
:::include(src="./doc/base.vue")
:::

## {{$t('datepicker.module2.title')}}
<span>{{$t('datepicker.module2.desc1')}}</span>
:::include(src="./doc/range.vue")
:::

## {{$t('datepicker.module3.title')}}
<span>{{$t('datepicker.module3.desc1')}}</span>
:::include(src="./doc/datetimerange.vue")
:::

## {{$t('datepicker.module4.title')}}
<span>{{$t('datepicker.module4.desc1')}}</span>
:::include(src="./doc/quick.vue")
:::

<!-- ### 不可选择日期和时间
:::include(src="./doc/disabled.vue")
:::

### 自定义确认栏
:::include(src="./doc/custom-confirm.vue")
::: -->

## API
<api-doc name="DatePicker" :doc="require('./api.json')"></api-doc>

#### DatePicker options
| 参数 | 说明 | 类型 | 默认值 |
|--- |--- |--- |--- |--- |
| shortcuts | 设置快捷选项，详细查看 **带快捷选择** demo | { text: string, value: Function, onClick: Function } | - |
| disabledDate | 设置不可选择的日期，参数为当前的日期，需要返回 Boolean 是否禁用这天 | boolean | - |

<style lang='scss'>
  .demo-picker-group{
    display: inline-block;
    text-align: left;
    +.demo-picker-group{
      margin-left: 60px;
    }
  }
</style>
