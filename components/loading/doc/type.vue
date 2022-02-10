<template>
  <div>
    <div class="demo-loading-text">
      <wt-loading size="small" message="正在加载中" />
    </div>
    <div class="demo-loading-text">
      <wt-loading type="line-scale" message="加载中" />
    </div>
  </div>
</template>
<style lang="scss">
.demo-loading-text {
  display: inline-block;
  vertical-align: middle;
  i {
    margin-right: 4px;
  }
}
.demo-loading-text + .demo-loading-text {
  margin-left: 80px;
}
</style>
