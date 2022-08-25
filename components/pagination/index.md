
# 分页 / Pagination
<span>{{$t('pagination.component_desc')}}</span>

## {{$t('pagination.module1.title')}}
:::include(src="./doc/base.vue")
:::

## {{$t('pagination.module2.title')}}
<span>{{$t('pagination.module2.desc1')}}</span>
:::include(src="./doc/full.vue")
:::

## API
<api-doc name="Pagination" :doc="require('./api.json')"></api-doc>

<style>
    .wt-pagination {
        text-align: center !important;
    }
</style>
