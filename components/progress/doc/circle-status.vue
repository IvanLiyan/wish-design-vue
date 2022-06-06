<template>
  <div>
    <div class="demo-circle">
      <wt-progress :percentage="72" type="circle" :width="30" />
      <div>72%</div>
    </div>
    <div class="demo-circle">
      <wt-progress :percentage="100" type="circle" :width="30" status="success" />
      <div style="color: #5ABB3C">完成</div>
    </div>
    <div class="demo-circle">
      <wt-progress :percentage="72" type="circle" :width="30" status="error" />
      <div style="color: #FF6459">失败</div>
    </div>
  </div>
</template>
<style lang="scss">
  .demo-circle {
    display: inline-block;
    width: 50px;
    font-size: 12px;
    text-align: center;
  }
</style>
