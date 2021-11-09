<template>
  <wt-anchor class="title-wrap" container=".app" :offset-top="180" :scroll-offset="108" :affix="false">
    <wt-anchor-link v-for="h2 in usedata" :href="h2.href" :title="h2.title" :key="h2.href">
      <wt-anchor-link v-for="h3 in h2.children" :href="h3.href" :title="h3.title" :key="h3.href" />
    </wt-anchor-link>
  </wt-anchor>
</template>

<script>
export default {
  name: 'ExAnClick',
  props: {
    usedata: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/var.scss';

.title-wrap {
  z-index: 100;
  position: fixed;
  width: 120px;
  top: $header-height + 32px;
  right: 20px;
  background-color: #fff;
}
</style>
<style lang="scss">
.hide-top-nav {
  .title-wrap {
    top: 32px;
  }
}
</style>
