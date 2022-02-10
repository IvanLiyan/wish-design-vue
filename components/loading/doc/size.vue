<template>
  <div>
    <div class="demo-loading-group">
      <wt-loading size="small" message="loading..." />
      <div class="bold">small</div>
    </div>
    <div class="demo-loading-group">
      <wt-loading message="loading..." />
      <div class="bold">normal</div>
    </div>
    <div class="demo-loading-group">
      <wt-loading size="large" message="loading..." />
      <div class="bold">large</div>
    </div>
  </div>
</template>
<style lang="scss">
.demo-loading-group {
  display: inline-block;
  i {
    margin-bottom: 4px;
  }
  .bold {
    font-weight: bold;
    margin-top: 15px;
    font-size: 16px;
  }
}
.demo-loading-group + .demo-loading-group {
  margin-left: 110px;
}
</style>
