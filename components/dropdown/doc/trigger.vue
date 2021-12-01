<template>
  <div class="demo-container">
    <wt-dropdown trigger="click">
      <wt-button type="text">
        <span style="margin-right: 4px">点击</span>
        <wt-icon name="chevron-down" />
      </wt-button>
      <wt-dropdown-menu slot="dropdown">
        <wt-dropdown-menu-item disabled>计算</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>网络</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>存储</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>数据库</wt-dropdown-menu-item>
      </wt-dropdown-menu>
    </wt-dropdown>
    <wt-dropdown trigger="hover">
      <wt-button type="text">
        <span style="margin-right: 4px">悬浮</span>
        <wt-icon name="chevron-down" />
      </wt-button>
      <wt-dropdown-menu slot="dropdown">
        <wt-dropdown-menu-item disabled>计算</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>网络</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>存储</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>数据库</wt-dropdown-menu-item>
      </wt-dropdown-menu>
    </wt-dropdown>
  </div>
</template>
<script>
