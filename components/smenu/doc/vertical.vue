<template>
  <div class="demo-menu-vertical-wrap">
    <mtd-menu v-model="activeName" mode="vertical">
      <mtd-submenu name="1">
        <template slot="title">一级菜单</template>
        <mtd-menu-item name="1-1">
          二级菜单
          <mtd-icon name="question-circle-o" slot="icon" />
        </mtd-menu-item>
        <mtd-menu-item name="1-2">
          二级菜单
          <mtd-icon name="question-circle-o" slot="icon" />
        </mtd-menu-item>
        <mtd-icon slot="icon" name="code" />
      </mtd-submenu>
      <mtd-submenu name="2">
        <span slot="title">一级菜单</span>
        <mtd-submenu name="2-1">
          <template slot="title">二级菜单</template>
          <mtd-menu-item name="2-1-1">
            三级菜单
            <mtd-icon name="question-circle-o" slot="icon" />
          </mtd-menu-item>
          <mtd-menu-item name="2-1-2">
            三级菜单
            <mtd-icon name="question-circle-o" slot="icon" />
          </mtd-menu-item>
          <mtd-icon slot="icon" name="code" />
        </mtd-submenu>
        <mtd-icon name="bell-o" slot="icon" />
      </mtd-submenu>
      <mtd-menu-item name="1-3">
        一级菜单
        <mtd-icon name="calculator-o" slot="icon" />
      </mtd-menu-item>
    </mtd-menu>
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
