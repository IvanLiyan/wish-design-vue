<template>
  <li
    :class="{
      [prefix]: true,
      [`${prefix}-disabled`]: disabled,
    }"
    v-on="listeners"
  >
    <slot></slot>
  </li>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
export default {
  name: 'WtDropdownMenuItem',
  props: {
    disabled: Boolean,
  },
  inject: {
    dropdown: {
      default: '',
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        click: this.handleClick,
      };
    },
    prefix() {
      return this.config.getPrefixCls('dropdown-menu-item');
    },
  },
  methods: {
    handleClick(e) {
      if (this.disabled) {
        return;
      }
      this.$emit('click', e);
      if (this.dropdown) {
        this.dropdown.$emit('itemClick', e);
      }
    },
  },
};
</script>
