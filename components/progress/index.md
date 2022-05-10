# 进度条 / Progress

向用户传达特定进程的进度，告知用户当前状态和预期。

## 基础样式
:::include(src="./doc/base.vue")
:::

## 类型与用法
### 环形进度条
:::include(src="./doc/circle.vue")
:::

### 状态
进度条会根据进程情况出现成功、失败两种状态。
:::include(src="./doc/status.vue")
:::

## API
<api-doc name="Progress" :doc="require('./api.json')"></api-doc>

<style>
    .demo-box{
        width: 350px;
        margin-left: 20px;
        display: inline-block;
        margin-bottom: 40px;
    }
    .demo-progress-small {
        width: 250px;
    }
    .demo-circle {
        display: inline-block;
        width: 50px;
        font-size: 12px;
        text-align: center;
    }
</style>