<template>
  <div class="demo-container">
    <wt-dropdown trigger="hover">
      <wt-button type="text">
        <span style="margin-right: 4px">更多</span>
        <wt-icon name="chevron-down" />
      </wt-button>
      <wt-dropdown-menu slot="dropdown">
        <wt-dropdown-menu-item><wt-icon name="printer" :width="18" :height="18" />计算</wt-dropdown-menu-item>
        <wt-dropdown-menu-item><wt-icon name="wifi" :width="18" :height="18" />网络</wt-dropdown-menu-item>
        <wt-dropdown-menu-item><wt-icon name="save" :width="18" :height="18" />存储</wt-dropdown-menu-item>
        <wt-dropdown-menu-item><wt-icon name="database" :width="18" :height="18" />数据库</wt-dropdown-menu-item>
      </wt-dropdown-menu>
    </wt-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.wt-icon {
  color: #b5bbd1;
  margin-right: 8px;
}
.wt-dropdown-menu-item {
  display: flex;
  align-items: center;
}
</style>
