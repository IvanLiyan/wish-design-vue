# 布局 / Layout
<span>{{$t('layout.component_desc')}}</span>

`<wt-layout>`：{{$t('layout.component_desc_layout1')}} `<wt-header>` {{$t('layout.component_desc_layout2')}} `<wt-footer>` {{$t('layout.component_desc_layout3')}}

`<wt-header>`：{{$t('layout.component_desc_header')}}

`<wt-aside>`：{{$t('layout.component_desc_aside')}}

`<wt-main>`：{{$t('layout.component_desc_main')}}

`<wt-footer>`：{{$t('layout.component_desc_footer')}}

:::include(src="./doc/base.vue")
:::

:::include(src="./doc/structure1.vue")
:::

:::include(src="./doc/structure2.vue")
:::

:::include(src="./doc/structure3.vue")
:::

:::include(src="./doc/structure4.vue")
:::

:::include(src="./doc/structure5.vue")
:::

:::include(src="./doc/structure6.vue")
:::

:::include(src="./doc/structure7.vue")
:::

## API
<api-doc name="Layout" :doc="require('./api.json')"></api-doc>
<api-doc name="Header" :doc="require('./../header/api.json')"></api-doc>
<api-doc name="Aside" :doc="require('./../aside/api.json')"></api-doc>
<api-doc name="Main" :doc="require('./../main/api.json')"></api-doc>
<api-doc name="Footer" :doc="require('./../footer/api.json')"></api-doc>
