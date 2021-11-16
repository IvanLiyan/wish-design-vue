<template>
  <label :class="wrapperCls">
    <input type="radio" />
    <span :class="`${prefix}-inner`"></span>
    <span :class="`${prefix}-text`"><slot></slot></span>
  </label>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtRadio',
  inheritAttrs: false,
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  props: {
    value: [String, Number],
    checked: Boolean,
    disabled: Boolean,
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('radio');
    },
    wrapperCls() {
      const { prefix } = this;
      return [
        prefix,
        {
          [`${prefix}-checked`]: this.checked,
          [`${prefix}-disabled`]: this.disabled,
        },
      ];
    },
  },
};
</script>
