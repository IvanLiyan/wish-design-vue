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
      default() {
        return [];
      },
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
    handleChange(checked, value) {
      const index = this.value.indexOf(value);
      const nextValue = [...this.value];
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
