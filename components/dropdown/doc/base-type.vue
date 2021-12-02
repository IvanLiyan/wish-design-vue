<template>
  <div class="demo-container">
    <wt-dropdown trigger="hover">
      <wt-button type="text">
        <span style="margin-right: 4px">more</span>
        <wt-icon name="chevron-down" />
      </wt-button>
      <wt-dropdown-menu slot="dropdown">
        <wt-dropdown-menu-item>calculate</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>network</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>store</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>database</wt-dropdown-menu-item>
      </wt-dropdown-menu>
    </wt-dropdown>
  </div>
</template>
<script>
