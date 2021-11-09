<template>
  <div class="source demo-row">
    <wt-row type="flex" class="row-bg">
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
      <wt-col :span="6"><div class="grid-content bg-purple-light"></div></wt-col>
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
    </wt-row>
    <wt-row type="flex" class="row-bg" justify="center">
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
      <wt-col :span="6"><div class="grid-content bg-purple-light"></div></wt-col>
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
    </wt-row>
    <wt-row type="flex" class="row-bg" justify="end">
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
      <wt-col :span="6"><div class="grid-content bg-purple-light"></div></wt-col>
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
    </wt-row>
    <wt-row type="flex" class="row-bg" justify="space-between">
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
      <wt-col :span="6"><div class="grid-content bg-purple-light"></div></wt-col>
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
    </wt-row>
    <wt-row type="flex" class="row-bg" justify="space-around">
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
      <wt-col :span="6"><div class="grid-content bg-purple-light"></div></wt-col>
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
    </wt-row>
  </div>
</template>

<style lang="scss">
.demo-row {
  .wt-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .wt-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>
