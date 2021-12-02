<template>
  <div class="demo-container">
    <wt-dropdown trigger="click">
      <wt-button type="text">
        <span style="margin-right: 4px">more</span>
        <wt-icon name="chevron-down" />
      </wt-button>
      <wt-dropdown-menu slot="dropdown">
        <wt-dropdown-menu-item
          >calculate<span class="demo-right-text">this is calculate explanation</span></wt-dropdown-menu-item
        >
        <wt-dropdown-menu-item
          >network <span class="demo-right-text">this is network explanation</span></wt-dropdown-menu-item
        >
        <wt-dropdown-menu-item
          >store<span class="demo-right-text">this is store explanation</span></wt-dropdown-menu-item
        >
        <wt-dropdown-menu-item
          >database<span class="demo-right-text">this is database explanation</span></wt-dropdown-menu-item
        >
      </wt-dropdown-menu>
    </wt-dropdown>
  </div>
</template>

<style lang="scss">
.demo-right-text {
  display: inline-block;
  margin-left: 10px;
  font-size: 12px;
  color: #adadad;
}
</style>
