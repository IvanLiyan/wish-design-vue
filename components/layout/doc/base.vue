<template>
  <div>
    <wt-layout>
      <wt-header>Header</wt-header>
      <wt-main>Main</wt-main>
    </wt-layout>
    <br />
    <wt-layout>
      <wt-header>Header</wt-header>
      <wt-main>Main</wt-main>
      <wt-footer>Footer</wt-footer>
    </wt-layout>
    <br />
    <wt-layout>
      <wt-aside width="200px">Aside</wt-aside>
      <wt-main>Main</wt-main>
    </wt-layout>
    <br />
    <wt-layout>
      <wt-header>Header</wt-header>
      <wt-layout>
        <wt-aside width="200px">Aside</wt-aside>
        <wt-main>Main</wt-main>
      </wt-layout>
    </wt-layout>
    <br />
    <wt-layout>
      <wt-header>Header</wt-header>
      <wt-layout>
        <wt-aside width="200px">Aside</wt-aside>
        <wt-layout>
          <wt-main>Main</wt-main>
          <wt-footer>Footer</wt-footer>
        </wt-layout>
      </wt-layout>
    </wt-layout>
    <br />
    <wt-layout>
      <wt-aside width="200px">Aside</wt-aside>
      <wt-layout>
        <wt-header>Header</wt-header>
        <wt-main>Main</wt-main>
      </wt-layout>
    </wt-layout>
    <br />
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
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .wt-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .wt-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .wt-layout:nth-child(5) .wt-aside,
  .wt-layout:nth-child(6) .wt-aside {
    line-height: 260px;
  }

  .wt-layout:nth-child(7) .wt-aside {
    line-height: 320px;
  }
</style>
