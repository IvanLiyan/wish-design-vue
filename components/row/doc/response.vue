<template>
  <div class="source demo-row">
    <wd-row :gutter="10">
      <wd-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple" /></wd-col>
      <wd-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light" /></wd-col>
      <wd-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple" /></wd-col>
      <wd-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light" /></wd-col>
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
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
  }
</style>
