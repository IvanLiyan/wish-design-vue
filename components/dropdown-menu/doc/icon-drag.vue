<template>
  <mtd-dropdown trigger="hover">
    <mtd-button type="text">
      <span style="margin-right: 4px;">产品服务</span>
      <i class="mtdicon mtdicon-down"></i>
    </mtd-button>
    <mtd-dropdown-menu slot="dropdown">
      <mtd-dropdown-menu-item class="demo-dropdown-menu-item">
        <i class="mtdicon mtdicon-calculator"></i>计算
      </mtd-dropdown-menu-item>
      <mtd-dropdown-menu-item class="demo-dropdown-menu-item">
        <i class="mtdicon mtdicon-wifi"></i>网络
      </mtd-dropdown-menu-item>
      <mtd-dropdown-menu-item class="demo-dropdown-menu-item">
        <i class="mtdicon mtdicon-store-and-distribute"></i>存储
      </mtd-dropdown-menu-item>
      <mtd-dropdown-menu-item class="demo-dropdown-menu-item">
        <i class="mtdicon mtdicon-database"></i>数据库
      </mtd-dropdown-menu-item>
    </mtd-dropdown-menu>
  </mtd-dropdown>
</template>
<style lang='scss'>
  .demo-dropdown-menu-item {
    .mtdicon {
      color: #B5BBD1;
      margin-right: 8px;
    }
  }
</style>
