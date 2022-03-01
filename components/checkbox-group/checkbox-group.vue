<template>
  <div :class="wrapperCls">
    <slot></slot>
  </div>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtCheckboxGroup',
  props: {
    value: {
      type: Array,
    },
    arrange: {
      type: String,
      default: 'horizontal',
      range: ['horizontal', 'vertical'],
    },
    disabled: Boolean,
    name: String,
  },
  provide() {
    return {
      checkboxGroup: this,
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
      return this.config.getPrefixCls('checkbox-group');
    },
    wrapperCls() {
      const { prefix } = this;
      return [prefix, `${prefix}-${this.arrange}`];
    },
  },
  created() {
    this.$on('checkboxChange', this.handleChange);
  },
  methods: {
    /**
     * 改变值
     */
    handleChange(checked, value) {
      const groupValue = this.value || [];
      const index = groupValue.indexOf(value);
      const nextValue = [...groupValue];
      if (checked) {
        nextValue.push(value);
      } else if (index !== -1) {
        nextValue.splice(index, 1);
      }
      this.$emit('input', nextValue);
      this.$emit('change', nextValue);
    },
  },
};
</script>
