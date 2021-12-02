<template>
  <div class="demo-container">
    <wt-dropdown trigger="click">
      <wt-button type="third">
        <span style="margin-right: 4px">click</span>
        <wt-icon name='more-vertical' :width='16' :height='16' />
      </wt-button>
      <wt-dropdown-menu slot="dropdown">
        <wt-dropdown-menu-item disabled>删除</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>添加</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>编辑</wt-dropdown-menu-item>
      </wt-dropdown-menu>
    </wt-dropdown>
   <wt-dropdown trigger="hover">
      <wt-button type="third">
        <span style="margin-right: 4px">hover</span>
        <wt-icon name='more-vertical' :width='16' :height='16' />
      </wt-button>
      <wt-dropdown-menu slot="dropdown">
        <wt-dropdown-menu-item disabled>删除</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>添加</wt-dropdown-menu-item>
        <wt-dropdown-menu-item>编辑</wt-dropdown-menu-item>
      </wt-dropdown-menu>
    </wt-dropdown>
  </div>
</template>
<script>
