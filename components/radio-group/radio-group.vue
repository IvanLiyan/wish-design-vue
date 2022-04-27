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
    // 单选框组的值
    value: [String, Number, Boolean, Function, Object, Array, Symbol],
    // 是否禁用
    disabled: Boolean,
    // RadioGroup 下所有 input[type='radio'] 的 name 属性
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
    /**
     * 监听radio的值变化
     */
    this.$on('radioChange', this.handleChange);
  },
  methods: {
    /**
     * 值改变
     */
    handleChange(radioValue) {
      if (this.value !== radioValue) {
        // 顺序不能改变，必须先input后change, 若先change，formItem会去校验，此时value值还没改变,会产生校验错误
        this.$emit('input', radioValue);
        this.$emit('change', radioValue);
      }
    },
  },
};
</script>
