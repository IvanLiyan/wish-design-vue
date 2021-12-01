<template>
  <ul
    :class="{
      [prefix]: true,
      [`${prefix}-${size}`]: size,
    }"
  >
    <slot></slot>
  </ul>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
export default {
  name: 'WtDropdownMenu',
  props: {
    size: String,
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
    prefix() {
      return this.config.getPrefixCls('dropdown-menu');
    },
  },
};
</script>
