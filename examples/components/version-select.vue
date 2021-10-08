<template>
  <mtd-input-group class="select-wrap">
    <span class="tag" slot="prepend">{{ tag }}</span>
    <mtd-select class="select" v-model="version" style="width: 150px">
      <mtd-option
        v-for="item in versions"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </mtd-select>
  </mtd-input-group>
</template>

<script>
import MTD from '@/index.js';

const versions = [
  { href: '/mtd/vue', label: MTD.version, value: MTD.version },
  { href: '/mtd/vue-next', label: 'Vue 3.x', value: 'Vue 3.x' },
];

export default {
  name: 'VersionSelector',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      versions,
      version: versions[0].value,
    };
  },
  watch: {
    version: {
      immediate: false,
      handler (version) {
        window.location.href = versions.find(ele => {
          return ele.value === version;
        }).href;
      },
    },
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
.select-wrap {
  width: auto;
  /deep/ {
    .mtd-input-group-prepend{
      background-color: #fff;
    }
    .mtd-input{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .tag {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
