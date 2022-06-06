<template>
  <div
    :class="{
      [prefix]: true,
      [`${prefix}-${type}`]: type,
    }"
  >
    <slot></slot>
  </div>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtExpansion',
  props: {
    value: [String, Number, Boolean, Object, Array],
    type: String,
  },
  provide() {
    return {
      expansion: this,
    };
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
      return this.config.getPrefixCls('expansion');
    },
  },
  created() {
    this.$on('itemClick', this.handleClick);
  },
  methods: {
    handleClick(active, item) {
      const isArray = Array.isArray(this.value);
      let nextValue;
      if (isArray) {
        nextValue = active ? [...this.value, item.value] : this.value.filter((v) => v !== item.value);
      } else {
        nextValue = active ? item.value : '';
      }
      this.$emit('input', nextValue);
      this.$emit('change', nextValue);
    },
  },
};
</script>
