<template>
  <svg :width="width" :height="width" :viewbox="viewbox">
    <circle
      :cx="cx"
      :cy="cx"
      :r="cr"
      :stroke-width="strokeWidth"
      stroke="currentColor"
      :class="`${prefix}-circle-outer`"
      fill="none"
    />
    <circle
      :cx="cx"
      :cy="cx"
      :r="cr"
      :stroke-width="strokeWidth"
      :stroke="strokeColor"
      stroke-linecap="round"
      fill="none"
      :transform="transform"
      :stroke-dasharray="strokeDasharray"
    />
  </svg>
</template>
<script>
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtCircleProgress',
  props: {
    color: {
      type: String,
    },
    strokeWidth: {
      type: Number,
      default: 6,
    },
    width: {
      type: Number,
      default: 72,
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100,
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
    strokeDasharray () {
      const percent = this.percentage / 100;
      const perimeter = Math.PI * 2 * this.cr;
      return `${perimeter * percent} ${perimeter * (1 - percent)}`;
    },
    strokeColor () {
      if (this.color) {
        return this.color;
      }
      return 'currentColor';
    },
    viewbox () {
      return `0 0 ${this.width} ${this.width}`;
    },
    cx () {
      return this.width / 2;
    },
    cr () {
      return this.cx - this.strokeWidth;
    },
    transform () {
      return `matrix(0,-1,1,0,0,${this.width})`;
    },
  },
};
</script>
