<template>
  <div class="layout-wrapper">
    <wt-layout>
      <wt-header>Header</wt-header>
      <wt-main>Main</wt-main>
    </wt-layout>
  </div>
</template>
<style scoped>
  .wt-header, .wt-footer {
    background-color: #ADC0FD;
    color: #0E161C;
    text-align: center;
    line-height: 60px;
  }

  .wt-aside {
    background-color: #E5ECFF;
    color: #0E161C;
    text-align: center;
    line-height: 200px;
  }

  .wt-main {
    background-color: #F7F9FA;
    color: #0E161C;
    text-align: center;
    line-height: 160px;
  }

  .layout-wrapper:nth-child(5) .wt-aside,
  .layout-wrapper:nth-child(6) .wt-aside {
    line-height: 260px !important;
  }

</style>
