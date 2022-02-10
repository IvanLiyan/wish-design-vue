<template>
  <div>
    <div class="demo-loading-group">
      <wt-loading size="small" />
      <div>小</div>
    </div>
    <div class="demo-loading-group">
      <wt-loading />
      <div>中</div>
    </div>
    <div class="demo-loading-group">
      <wt-loading size="large" />
      <div>大</div>
    </div>
  </div>
</template>
<style lang="scss">
.demo-loading-group {
  display: inline-block;
  i {
    margin-bottom: 4px;
  }
}
.demo-loading-group + .demo-loading-group {
  margin-left: 110px;
}
</style>
