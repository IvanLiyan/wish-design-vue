<template>
  <section
    :class="{
      [prefix]: true,
      [`${prefix}-vertical`]: isVertical
    }">
    <slot></slot>
  </section>
</template>

<script>
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtLayout',

  componentName: 'wt-Layout',

  props: {
    direction: String,
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
    prefix () {
      return this.config.getPrefixCls('layout');
    },
    isVertical () {
      if (this.direction === 'vertical') {
        return true;
      } else if (this.direction === 'horizontal') {
        return false;
      }
      return this.$slots && this.$slots.default
        ? this.$slots.default.some(vnode => {
          const tag = vnode.componentOptions && vnode.componentOptions.tag;
          return tag === 'wt-header' || tag === 'wt-footer';
        })
        : false;
    },
  },
};
</script>
