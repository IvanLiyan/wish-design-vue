<template>
  <div>
    <wt-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <wt-radio-button :value="false">展开</wt-radio-button>
      <wt-radio-button :value="true">收起</wt-radio-button>
    </wt-radio-group>
    <wt-menu
      class="demo-menu-collapse"
      v-model="activeName"
      mode="inline"
      theme="dark"
      :collapse="isCollapse">
      <wt-submenu name="1">
        <wt-icon slot="icon" name="home-o" />
        <template slot="title">一级菜单</template>
        <wt-menu-item name="1-1">
          二级菜单
          <wt-icon name="cart-o" slot="icon" />
        </wt-menu-item>
        <wt-menu-item name="1-2">
          二级菜单
          <wt-icon name="calendar-o" slot="icon" />
        </wt-menu-item>
      </wt-submenu>
      <wt-submenu name="2">
        <wt-icon slot="icon" name="menus-o" />
        <span slot="title">一级菜单</span>
        <wt-submenu name="2-1">
          <wt-icon name="calendar-o" slot="icon" />
          <template slot="title">二级菜单</template>
          <wt-menu-item name="2-1-1">
            三级菜单
            <wt-icon name="calculator-o" slot="icon" />
          </wt-menu-item>
          <wt-menu-item name="2-1-2dd">
            三级菜单
            <wt-icon name="bell-o" slot="icon" />
          </wt-menu-item>
        </wt-submenu>
      </wt-submenu>
      <wt-menu-item name="1-3">
        一级菜单
        <wt-icon name="time-o" slot="icon" />
      </wt-menu-item>
    </wt-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: '',
      isCollapse: false,
    };
  },
};
</script>
<style lang="scss">
.demo-menu-collapse{
  width: 200px;
}
</style>
