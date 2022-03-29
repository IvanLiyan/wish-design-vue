<template>
  <div>
    <mtd-radio-group v-model="theme" style="margin-bottom: 20px;">
      <mtd-radio-button value="dark">深色</mtd-radio-button>
      <mtd-radio-button value="light">浅色</mtd-radio-button>
    </mtd-radio-group>
    <mtd-menu class="demo-menu-theme" v-model="activeName" :theme="theme">
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
      theme: 'light',
    };
  },
};
</script>
<style lang="scss">
.demo-menu-theme {
  width: 200px;
}
</style>
