<template>
  <footer :class="prefix" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtFooter',

  componentName: 'WtFooter',

  props: {
    // 高度
    height: {
      type: String,
      default: '60px',
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
      return this.config.getPrefixCls('footer');
    },
  },
};
</script>
