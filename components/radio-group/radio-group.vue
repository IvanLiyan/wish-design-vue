<template>
  <div :class="wrapperCls">
    <slot></slot>
  </div>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtRadioGroup',
  props: {
    value: [String, Number, Boolean, Function, Object, Array, Symbol],
    disabled: Boolean,
    size: String,
    name: String,
    // 排列方式
    arrange: {
      type: String,
      default: 'horizontal',
      range: ['horizontal', 'vertical'],
    },
  },
  provide() {
    return {
      radioGroup: this,
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
      return this.config.getPrefixCls('radio-group');
    },
    wrapperCls() {
      const { prefix } = this;
      return [prefix, `${prefix}-${this.arrange}`];
    },
  },
  created() {
    this.$on('radioChange', this.handleChange);
  },
  methods: {
    handleChange(radioValue) {
      if (this.value !== radioValue) {
        this.$emit('input', radioValue);
        this.$emit('change', radioValue);
      }
    },
  },
};
</script>
