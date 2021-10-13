<style lang='scss'>
.demo-dropdown-btn-group {
  .wd-dropdown + .wd-dropdown {
    margin-left: 80px;
  }
}
</style>
<template>
  <div>
    <div class="demo-dropdown-btn-group source">
      <wd-dropdown>
        <wd-button type="text">
          <span style="margin-right: 4px;">更多</span>
          <i class="wdicon wdicon-down" />
        </wd-button>
        <wd-dropdown-menu slot="dropdown">
          <wd-dropdown-menu-item>添加</wd-dropdown-menu-item>
          <wd-dropdown-menu-item>删除</wd-dropdown-menu-item>
          <wd-dropdown-menu-item>复制</wd-dropdown-menu-item>
        </wd-dropdown-menu>
      </wd-dropdown>
      <wd-dropdown>
        <wd-button type="text">
          <i class="wdicon wdicon-edit-o" style="margin-right: 4px;" />
          <i class="wdicon wdicon-down" />
        </wd-button>
        <wd-dropdown-menu slot="dropdown">
          <wd-dropdown-menu-item>添加</wd-dropdown-menu-item>
          <wd-dropdown-menu-item>删除</wd-dropdown-menu-item>
          <wd-dropdown-menu-item>复制</wd-dropdown-menu-item>
        </wd-dropdown-menu>
      </wd-dropdown>
      <wd-dropdown>
        <wd-button type="primary">
          更多
          <i class="wdicon wdicon-down" />
        </wd-button>
        <wd-dropdown-menu slot="dropdown">
          <wd-dropdown-menu-item>添加</wd-dropdown-menu-item>
          <wd-dropdown-menu-item>删除</wd-dropdown-menu-item>
          <wd-dropdown-menu-item>复制</wd-dropdown-menu-item>
        </wd-dropdown-menu>
      </wd-dropdown>
      <wd-dropdown>
        <wd-button>
          <i class="wdicon wdicon-edit-o" style="margin-right: 4px;" />
          <i class="wdicon wdicon-down" />
        </wd-button>
        <wd-dropdown-menu slot="dropdown">
          <wd-dropdown-menu-item>添加</wd-dropdown-menu-item>
          <wd-dropdown-menu-item>删除</wd-dropdown-menu-item>
          <wd-dropdown-menu-item>复制</wd-dropdown-menu-item>
        </wd-dropdown-menu>
      </wd-dropdown>
    </div>
  </div>
</template>
