<template>
  <div>
    <div class="demo-menu-horizontal-wrap">
    <wt-menu v-model="activeName" mode="horizontal">
      <wt-submenu name="1">
        <wt-icon slot="icon" name="home-o" />
        <template slot="title">一级菜单</template>
        <wt-menu-item name="1-1">
          二级菜单
          <wt-icon name="home-o" slot="icon" />
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
          <wt-icon name="bell-o" slot="icon" />
          <template slot="title">二级菜单</template>
          <wt-menu-item name="2-1-1" :route="{path: 'modal'}">
            三级菜单
            <wt-icon name="calculator-o" slot="icon" />
          </wt-menu-item>
          <wt-menu-item name="2-1-2" :route="{ path: 'anchor'}">
            三级菜单
            <wt-icon name="calculator-o" slot="icon" />
          </wt-menu-item>
        </wt-submenu>
      </wt-submenu>
      <wt-menu-item name="3-1">
        <wt-icon name="calculator-o" slot="icon" />
        一级菜单
      </wt-menu-item>
    </wt-menu>
    <br />
    <br />
    <br />
    <wt-menu v-model="activeName2" mode="horizontal" theme="dark">
      <wt-submenu name="1">
        <wt-icon slot="icon" name="home-o" />
        <template slot="title">一级菜单</template>
        <wt-menu-item name="1-1">
          二级菜单
          <wt-icon name="home-o" slot="icon" />
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
          <wt-icon name="bell-o" slot="icon" />
          <template slot="title">二级菜单</template>
          <wt-menu-item name="2-1-1" :route="{path: 'modal'}">
            三级菜单
            <wt-icon name="calculator-o" slot="icon" />
          </wt-menu-item>
          <wt-menu-item name="2-1-2" :route="{ path: 'anchor'}">
            三级菜单
            <wt-icon name="calculator-o" slot="icon" />
          </wt-menu-item>
        </wt-submenu>
      </wt-submenu>
      <wt-menu-item name="3-1">
        <wt-icon name="calculator-o" slot="icon" />
        一级菜单
      </wt-menu-item>
    </wt-menu>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: '',
      activeName2: '',
    };
  },
};
</script>
<style lang="scss">
.demo-menu-horizontal-wrap {
  width: 100%;
  margin-bottom: 100px;

}
</style>
