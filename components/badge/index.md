# 徽章 / Badge
用于展示提示或内容的条数的更新

## 基础样式
分为点状提示和数字提示
<br />
点状提示适用于内容条数不确定或不重要的场景
<br />
数字提示适用于内容条数确定且重要的场景
:::include(src="./doc/base.vue")
:::

## 用法
可以用于提醒代办事项、新消息有更新
:::include(src="./doc/usage.vue")
:::
<!-- 
### 不显示数量
只需要引导用户注意变化，不需要关注数量。
:::include(src="./doc/num.vue")
:::


### 组合样式

:::include(src="./doc/combination.vue")
::: -->

## API
<api-doc name="Badge" :doc="require('./api.json')"></api-doc>

### 测试
:::include(src="./doc/tests.vue")
:::

<style>
    .example-badge {
        margin-right: 80px;
        vertical-align: middle;
    }
</style>
