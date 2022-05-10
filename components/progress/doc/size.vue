<template>
  <div class="demo-box source">
    <wt-progress :percentage="65" :stroke-width="8" class="demo-progress-small" /><br />
    <wt-progress :percentage="65" />
  </div>
</template>

<style lang="scss">
  .demo-box{
    width: 350px;
    margin-left: 20px;
    display: inline-block;
    margin-bottom: 40px;
  }
  .demo-progress-small {
    width: 250px;
  }
</style>
