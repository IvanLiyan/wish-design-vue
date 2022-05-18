<template>
  <div :class="prefix"><slot></slot><span
    v-show="text || text === 0 || dot"
    v-text="text"
    class=""
    :class="{
      [`${prefix}-text`]: true,
      [`${prefix}-position`]: $slots.default,
      [`${prefix}-dot`]: dot,
      [`${prefix}-hidden`]: hidden,
      [`${prefix}-rounded`]: rounded,
    }"></span>
  </div>
</template>
<script>
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtBadge',

  props: {
    value: [String, Number],
    dot: Boolean,
    max: Number,
    hidden: Boolean,
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
      return this.config.getPrefixCls('badge');
    },
    text () {
      const { dot, value, max } = this;
      if (dot) {
        return;
      }
      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value;
      }

      return value;
    },
    rounded () {
      return String(this.text).length === 1;
    },
  },
};
</script>
