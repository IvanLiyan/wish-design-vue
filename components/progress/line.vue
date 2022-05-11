<template>
<div
  :class="`${prefix}-bar`"
  :style="{height: `${strokeWidth}px`}">
  <div :class="`${prefix}-bar-outer`">
    <div
      :class="`${prefix}-bar-inner`"
      :style="{
        width: `${percentage > 100 ? 100 : percentage}%`,
        background: color
      }"></div>
  </div>
</div>
</template>
<script>
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtLineProgress',
  props: {
    color: {
      type: String,
    },
    strokeWidth: {
      type: Number,
      default: 8,
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0,
    },
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
      return this.config.getPrefixCls('progress');
    },
  },
};
</script>
