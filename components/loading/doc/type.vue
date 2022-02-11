<template>
  <div>
    <div class="demo-loading-text">
      <wt-loading size="small" message="loading" />
    </div>
    <div class="demo-loading-text">
      <wt-loading type="line-scale" message="loading" />
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
