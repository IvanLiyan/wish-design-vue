<template>
  <div class="layout-wrapper">
    <wt-layout>
      <wt-aside width="200px">Aside</wt-aside>
      <wt-layout>
        <wt-header>Header</wt-header>
        <wt-main>Main</wt-main>
        <wt-footer>Footer</wt-footer>
      </wt-layout>
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
    line-height: 320px;
  }

  .wt-main {
    background-color: #F7F9FA;
    color: #0E161C;
    text-align: center;
    line-height: 160px;
  }
</style>
