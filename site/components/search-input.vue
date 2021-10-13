<template>
  <div class="search-input">
    <wd-select icon="wdicon wdicon-search"
      placeholder="搜索"
      filterable
      @focus="handleFocus"
      @blur="handleBlur"
      :value="search"
      @input="handleSearch"
      popper-class="search-dropdown"
    >
      <wd-option v-for="nav in components" :key="nav.path"
        :label="`${nav.cnName} / ${nav.name}`" :value="nav.path" />
    </wd-select>
  </div>
</template>
<script>
export default {
  props: {
    components: Array,
  },
  data () {
    return {
      focused: false,
      search: '',
    };
  },
  methods: {
    handleFocus () {
      this.focused = true;
    },
    handleBlur () {
      this.focused = false;
    },
    handleSearch (v) {
      this.search = v;
      if (this.search) {
        this.$router.push(`/components/${this.search}`);
        this.$nextTick(() => { this.search = ''; });
      }
    },
  },
};
</script>
<style lang="scss">
@import '../styles/var.scss';
$icon-width: 34px;

.search-input {
  display: inline-block;
  display: flex;

  .wd-select {
    width: 156px;
    flex: 1;
  }
  .wd-select-search-focus{
    .wd-input-suffix-inner{
      i{
        transform: none;
      }
    }
  }
}
.search-dropdown{
  &[x-placement^="bottom"]{
    margin-top: 4px;
  }
  .wd-dropdown-menu{
    margin: 4px 0px;
    padding: 0px;
  }
}
</style>
