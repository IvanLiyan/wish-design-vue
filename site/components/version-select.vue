<template>
  <wd-input-group class="select-wrap">
    <span class="tag" slot="prepend">{{ tag }}</span>
    <wd-select class="select" v-model="version" style="width: 150px">
      <wd-option
        v-for="item in versions"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </wd-select>
  </wd-input-group>
</template>

<script>
import WD from '@/index.js';

const versions = [
  { href: '/wd/vue', label: WD.version, value: WD.version },
  { href: '/wd/vue-next', label: 'Vue 3.x', value: 'Vue 3.x' },
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
    .wd-input-group-prepend{
      background-color: #fff;
    }
    .wd-input{
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
