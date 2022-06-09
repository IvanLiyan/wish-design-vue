<template>
  <mtd-menu v-model="activeName" mode="horizontal">
    <mtd-submenu name="1">
      <mtd-icon slot="icon" name="home-o" />
      <template slot="title">一级菜单</template>
      <mtd-menu-item name="1-1">
        二级菜单
        <mtd-icon name="cart-o" slot="icon" />
      </mtd-menu-item>
      <mtd-menu-item name="1-2">
        二级菜单
        <mtd-icon name="calendar-o" slot="icon" />
      </mtd-menu-item>
    </mtd-submenu>
    <mtd-submenu name="2">
      <mtd-icon slot="icon" name="menus-o" />
      <span slot="title">一级菜单</span>
      <mtd-submenu name="2-1">
        <mtd-icon name="calendar-o" slot="icon" />
        <template slot="title">二级菜单</template>
        <mtd-menu-item name="2-1-1">
          三级菜单
          <mtd-icon name="calculator-o" slot="icon" />
        </mtd-menu-item>
        <mtd-menu-item name="2-1-2dd">
          三级菜单
          <mtd-icon name="bell-o" slot="icon" />
        </mtd-menu-item>
      </mtd-submenu>
    </mtd-submenu>
    <mtd-menu-item name="1-3">
      一级菜单
      <mtd-icon name="time-o" slot="icon" />
    </mtd-menu-item>
  </mtd-menu>
</template>
<script>
export default {
  data () {
    return {
      activeName: '',
    };
  },
};
</script>
<style lang="scss">
.demo-menu-wrap {
  width: 400px;
  display: inline-block;
}
</style>
