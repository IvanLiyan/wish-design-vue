<template>
  <div class="demo-container">
    <wt-dropdown trigger="click">
      <wt-button type="text">
        <span style="margin-right: 4px">更多</span>
        <wt-icon name="chevron-down" />
      </wt-button>
      <wt-dropdown-menu slot="dropdown">
        <wt-dropdown-menu-item> 计算 <span class="demo-right-text">我是计算的说明</span></wt-dropdown-menu-item>
        <wt-dropdown-menu-item>网络 <span class="demo-right-text">我是网络的说明</span></wt-dropdown-menu-item>
        <wt-dropdown-menu-item>存储 <span class="demo-right-text">我是存储的说明</span></wt-dropdown-menu-item>
        <wt-dropdown-menu-item>数据库 <span class="demo-right-text">我是数据库的说明</span></wt-dropdown-menu-item>
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
