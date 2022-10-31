<style>
.demo-menu.demo-block .source{
  text-align: left;
}
</style>
# 导航菜单 / Menu

## <span>{{$t('menu.module1.subtitle')}}</span>
:::include(src="./doc/base.vue")
:::

## API
<api-doc name="Menu" :doc="require('./api.json')"></api-doc>
<api-doc name="SubMenu" :doc="require('./../submenu/api.json')"></api-doc>
<api-doc name="MenuItem" :doc="require('./../menu-item/api.json')"></api-doc>

<!-- ## 测试
:::include(src="./doc/tests.vue")
::: -->
