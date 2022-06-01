<template>
  <span :class="wrapperCls" @click.prevent="handleClick">
    <span :class="`${prefix}-btn`"></span>
    <span :class="`${prefix}-text`"><slot></slot></span>
    <span :class="`${prefix}-hint`" v-if="$slots.hint"><slot name="hint"></slot></span>
  </span>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtSwitch',
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
    value: {}, // 设置开关是否选中，使用 value === true-value 来判断是否打开
    trueValue: {
      // switch 打开时的值
      default: true,
    },
    falseValue: {
      // switch 关闭时的值
      default: false,
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false,
    },
    name: String, // switch 组件的 name 属性
    hint: String, // 注释内容
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('switch');
    },
    wrapperCls() {
      const { prefix } = this;
      return [
        prefix,
        {
          [`${prefix}-active`]: this.checked,
          [`${prefix}-disabled`]: this.disabled,
        },
      ];
    },
    /*
     * 判断switch是否打开
     */
    checked() {
      return this.value === this.trueValue;
    },
  },
  methods: {
    /*
     * 点击switch
     */
    handleClick(e) {
      if (this.disabled || this.loading) {
        return false;
      }
      const value = this.checked ? this.falseValue : this.trueValue;
      this.$emit('change', value);
      this.$emit('input', value);
    },
  },
};
</script>
