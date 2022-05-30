<template>
  <main :class="prefix">
    <slot></slot>
  </main>
</template>

<script>
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtMain',
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
      return this.config.getPrefixCls('main');
    },
  },
};
</script>
