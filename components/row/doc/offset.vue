<template>
  <div class="source demo-row">
    <wt-row :gutter="20">
      <wt-col :span="6"><div class="grid-content bg-purple"></div></wt-col>
      <wt-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></wt-col>
    </wt-row>
    <wt-row :gutter="20">
      <wt-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></wt-col>
      <wt-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></wt-col>
    </wt-row>
    <wt-row :gutter="20">
      <wt-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></wt-col>
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
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
}
</style>
