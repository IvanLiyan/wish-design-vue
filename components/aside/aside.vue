<template>
  <aside :class="prefix" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtAside',
  componentName: 'WtAside',
  props: {
    // 宽度
    width: {
      type: String,
      default: '300px',
    },
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('aside');
    },
  },
};
</script>
