<template>
  <div class="demo-box source">
    <mtd-progress :percentage="65" :stroke-width="6" class="demo-progress-small" /><br />
    <mtd-progress :percentage="65" />
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
