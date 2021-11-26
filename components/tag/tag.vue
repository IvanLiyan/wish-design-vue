<template>
  <i :class="wrapperCls" @click.prevent="handleClick">
    <span><slot></slot></span>
    <Icon name="x" v-if="clearable" @click.stop="handleClose" />
  </i>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

import Icon from '@components/icon';
export default {
  name: 'WtTag',
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
    size: {
      default: 'normal',
      range: ['normal', 'large'],
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    type: {
      default: 'default',
      range: ['default', 'primary', 'success', 'danger', 'warning'],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('tag');
    },
    radius() {
      return this.rounded ? 'round' : 'square';
    },
    wrapperCls() {
      const { prefix } = this;
      return [
        prefix,
        `${prefix}-${this.type}`,
        `${prefix}-${this.size}`,
        `${prefix}-${this.radius}`,
        {
          [`${prefix}-disabled`]: this.disabled,
          [`${prefix}-clickable`]: !!this.$listeners.click,
        },
      ];
    },
  },
  methods: {
    handleClick(e) {
      if (this.disabled) {
        return false;
      }
      this.$emit('click', e);
    },
    handleClose(e) {
      if (this.disabled) {
        return false;
      }
      this.$emit('close', e);
    },
  },
};
</script>
