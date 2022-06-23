# 进度条 / Progress

<span>{{$t('progress.component_desc')}}</span>

## <span>{{$t('progress.module1.title')}}</span>
:::include(src="./doc/base.vue")
:::

## <span>{{$t('progress.module2.title')}}</span>
:::include(src="./doc/circle.vue")
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
    .demo-box div {
        margin-bottom: 16px;
    }
    .demo-progress-small {
        width: 250px;
    }
    .demo-circle {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .demo-circle div {
        margin: 0 16px;
    }
</style>