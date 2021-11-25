<template>
  <span :class="wrapperCls" @click.prevent="handleClick">
    <span :class="`${prefix}-btn`"></span>
    <span :class="`${prefix}-text`"><slot></slot></span>
    <span :class="`${prefix}-hint`" v-if="$slots.hint"><slot name="hint"></slot></span>
  </span>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
import Icon from '@components/icon';

export default {
  name: 'WtSwitch',
  components: {
    Icon,
  },
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
    value: {},
    trueValue: {
      default: true,
    },
    falseValue: {
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
      return this.config.getPrefixCls('switch');
    },
    checked() {
      return this.value === this.trueValue;
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
  },
  methods: {
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
