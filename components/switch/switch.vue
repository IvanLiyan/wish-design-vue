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
<<<<<<< HEAD
    value: {}, // 设置开关是否选中，使用 value === true-value 来判断是否打开
=======
    // 设置开关是否选中，使用 value === true-value 来判断是否打开
    value: {},
    // switch 打开时的值
>>>>>>> 64caf648948e8540f0e20285e15d877defd6ddf3
    trueValue: {
      // switch 打开时的值
      default: true,
    },
    // switch 关闭时的值
    falseValue: {
      // switch 关闭时的值
      default: false,
    },
    // 是否禁用
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false,
    },
<<<<<<< HEAD
    name: String, // switch 组件的 name 属性
    hint: String, // 注释内容
=======
    // switch 组件的 name 属性
    name: String,
    // 注释内容
    hint: String,
>>>>>>> 64caf648948e8540f0e20285e15d877defd6ddf3
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
      if (this.disabled) {
        return false;
      }
      const value = this.checked ? this.falseValue : this.trueValue;
      this.$emit('change', value);
      this.$emit('input', value);
    },
  },
};
</script>
