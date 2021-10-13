<template>
  <div :is="tag" :class="[
    prefix,
    justify !== 'start' ? `${prefix}-justify-${justify}` : '',
    align !== 'top' ? `${prefix}-align-${align}` : '',
    { [`${prefix}-flex`]: type === 'flex' }
  ]">
    <slot />
  </div>
</template>
<script>
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WdRow',

  props: {
    tag: {
      type: String,
      default: 'div',
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start',
    },
    align: {
      type: String,
      default: 'top',
    },
  },
  provide () {
    return { row: this };
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
      return this.config.getPrefixCls('row');
    },
    style () {
      const ret = {};

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    },
  },
};
</script>
