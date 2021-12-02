<template>
  <div class="demo-container">
    <wt-dropdown trigger="hover">
      <wt-button type="text">
        <span style="margin-right: 4px">more</span>
        <wt-icon name="chevron-down" />
      </wt-button>
      <wt-dropdown-menu slot="dropdown">
        <wt-dropdown-menu-item><wt-icon name="printer" :width="18" :height="18" />calculate</wt-dropdown-menu-item>
        <wt-dropdown-menu-item><wt-icon name="wifi" :width="18" :height="18" />network</wt-dropdown-menu-item>
        <wt-dropdown-menu-item><wt-icon name="save" :width="18" :height="18" />store</wt-dropdown-menu-item>
        <wt-dropdown-menu-item><wt-icon name="database" :width="18" :height="18" />database</wt-dropdown-menu-item>
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
