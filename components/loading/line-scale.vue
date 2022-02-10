<template>
  <div :class="prefix">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
export default {
  name: 'WtLineScaleLoading',
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('loading-line-scale');
    },
  },
};
</script>
