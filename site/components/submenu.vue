<template>
  <div class="submenu"><LangSelector @theme="handleTheme" /></div>
</template>
<script>
// import StyleSelector from './style-select';
// import VersionSelector from './version-select';
import LangSelector from './lang-select';

export default {
  components: {
    // StyleSelector,
    // VersionSelector,
    LangSelector,
  },
  provide() {
    return {
      router: this,
    };
  },
  data() {
    return {
      route: undefined,
      $router: undefined,
      theme: undefined,
    };
  },
  methods: {
    handleTheme(theme) {
      this.theme = theme;
    },
  },
};
</script>
<style lang="scss">
.submenu {
  display: flex;
  align-items: center;
  > div {
    margin-left: 12px;
  }
}
</style>
