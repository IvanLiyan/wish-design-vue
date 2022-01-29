# 提示 / Notification

<span>默认 5 秒自动消失，通常出现在窗口的右上角，多个同时出现时，以纵向顺序排列
用于展示即时的操作反馈，通常用于不打断用户操作的提醒</span>

:::include(src="./doc/base.vue")
:::

## API

你可以通过 this.$wt.notify 来直接调用组件，亦或者使用单独引用的方式调用组件

```
import { Notification } from '@wish/wt-vue';
```

<api-doc name="Notification" :doc="require('./api.json')"></api-doc>

:::include(src="./doc/show.vue")
:::
