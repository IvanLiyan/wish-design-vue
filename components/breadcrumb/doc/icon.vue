<template>
  <div class="demo-breadcrumb-group source">
    <wt-breadcrumb :show-back-icon="true">
      <wt-breadcrumb-item tag="router-link" to="/">Home page</wt-breadcrumb-item>
      <wt-breadcrumb-item tag="router-link" to="/">First item</wt-breadcrumb-item>
      <wt-breadcrumb-item tag="router-link" to="/">Second item</wt-breadcrumb-item>
      <wt-breadcrumb-item>Third item</wt-breadcrumb-item>
    </wt-breadcrumb>
  </div>
</template>
<style lang="scss">
.demo-breadcrumb-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
