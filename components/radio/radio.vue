<template>
  <label :class="wrapperCls" @click.prevent="handleClick">
    <input type="radio" style="display: none" :name="name" />
    <span :class="`${prefix}-inner`"></span>
    <span :class="`${prefix}-text`"><slot></slot></span>
    <span :class="`${prefix}-hint`"><slot name="hint"></slot></span>
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
    value: [String, Number, Boolean, Function, Object, Array, Symbol],
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: String,
    hint: String,
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
  methods: {
    handleClick($event) {
      if (!this.disabled && !this.checked) {
        this.$emit('input', true);
      }
      if (!this.disabled) {
        this.$emit('click', $event);
      }
    },
  },
};
</script>
