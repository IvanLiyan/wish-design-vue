<template>
  <div class="source demo-row">
    <wd-row :gutter="20">
      <wd-col :span="16"><div class="grid-content bg-purple" /></wd-col>
      <wd-col :span="8"><div class="grid-content bg-purple" /></wd-col>
    </wd-row>
    <wd-row :gutter="20">
      <wd-col :span="8"><div class="grid-content bg-purple" /></wd-col>
      <wd-col :span="8"><div class="grid-content bg-purple" /></wd-col>
      <wd-col :span="4"><div class="grid-content bg-purple" /></wd-col>
      <wd-col :span="4"><div class="grid-content bg-purple" /></wd-col>
    </wd-row>
    <wd-row :gutter="20">
      <wd-col :span="4"><div class="grid-content bg-purple" /></wd-col>
      <wd-col :span="16"><div class="grid-content bg-purple" /></wd-col>
      <wd-col :span="4"><div class="grid-content bg-purple" /></wd-col>
    </wd-row>
  </div>
</template>
<style lang='scss'>
  .demo-row {
    .wd-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .wd-col {
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
