# TimePicker / 时间选择器
<span>{{$t('timepicker.component_desc')}}</span>

## <span>{{$t('timepicker.module1.title')}}</span>
:::include(src="./doc/base.vue")
:::

## <span>{{$t('timepicker.module2.title')}}</span>
<span>{{$t('timepicker.module2.desc')}}</span>
:::include(src="./doc/now.vue")
:::

## <span>{{$t('timepicker.module3.title')}}</span>
<span>{{$t('timepicker.module3.desc')}}</span>
:::include(src="./doc/range.vue")
:::

<!-- ### 日期格式
默认情况下，组件接受并返回 `Date` 对象。以下为可用的格式化字串，以 UTC 2017年1月2日 03:04:05 为例：

| 格式 | 含义 | 备注 | 举例 |
|------|------|------|------|------|
| `H`  | 小时 | 24小时制；不补0 | 3 |
| `HH` | 小时 | 24小时制 | 03 |
| `h`  | 小时 | 12小时制，须和 `A` 或 `a` 使用；不补0 | 3 |
| `hh` | 小时 | 12小时制，须和 `A` 或 `a` 使用 | 03 |
| `m`  | 分钟 | 不补0 | 4 |
| `mm` | 分钟 | | 04 |
| `s`  | 秒 | 不补0 | 5 |
| `ss` | 秒 | | 05 |
| `A`  | AM/PM | 仅 `format` 可用，大写 | AM |
| `a`  | am/pm | 仅 `format` 可用，小写 | am | -->

## API
<api-doc name="TimePicker" :doc="require('./api.json')"></api-doc>

:::include(src="./doc/show.vue")
:::