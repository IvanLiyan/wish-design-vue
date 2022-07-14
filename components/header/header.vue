<template>
  <header :class="prefix" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';
export default {
  name: 'WtHeader',

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
      return this.config.getPrefixCls('header');
    },
  },
};
</script>
