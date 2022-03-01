<template>
  <label :class="wrapperCls" @click.prevent="handleClick">
    <input type="radio" style="display: none" :name="name" />
    <span :class="`${prefix}-inner`"></span>
    <span :class="`${prefix}-text`"><slot></slot></span>
    <span :class="`${prefix}-hint`" v-if="$slots.hint"><slot name="hint"></slot></span>
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
    // value: [String, Number, Boolean, Function, Object, Array, Symbol],
    // 是否选中
    checked: {
      type: Boolean,
      default: false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // radio 内容
    name: String,
    // radio 提示
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
    /**
     * 点击
     */
    handleClick($event) {
      if (!this.disabled && !this.checked) {
        this.$emit('input', true);
        this.$emit('change', true);
      }
      if (!this.disabled) {
        this.$emit('click', $event);
      }
    },
  },
};
</script>
