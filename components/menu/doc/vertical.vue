<template>
  <div class="demo-menu-vertical-wrap">
    <wt-menu v-model="activeName" mode="vertical">
      <wt-submenu name="1">
        <template slot="title">一级菜单</template>
        <wt-menu-item name="1-1">
          二级菜单
          <wt-icon name="question-circle-o" slot="icon" />
        </wt-menu-item>
        <wt-menu-item name="1-2">
          二级菜单
          <wt-icon name="question-circle-o" slot="icon" />
        </wt-menu-item>
        <wt-icon slot="icon" name="code" />
      </wt-submenu>
      <wt-submenu name="2">
        <span slot="title">一级菜单</span>
        <wt-submenu name="2-1">
          <template slot="title">二级菜单</template>
          <wt-menu-item name="2-1-1">
            三级菜单
            <wt-icon name="question-circle-o" slot="icon" />
          </wt-menu-item>
          <wt-menu-item name="2-1-2">
            三级菜单
            <wt-icon name="question-circle-o" slot="icon" />
          </wt-menu-item>
          <wt-icon slot="icon" name="code" />
        </wt-submenu>
        <wt-icon name="bell-o" slot="icon" />
      </wt-submenu>
      <wt-menu-item name="1-3">
        一级菜单
        <wt-icon name="calculator-o" slot="icon" />
      </wt-menu-item>
    </wt-menu>
  </div>
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
.demo-menu-vertical-wrap {
  width: 240px;
}
</style>
