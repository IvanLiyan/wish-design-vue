<template>
  <svg :style="style" :class="prefix" :viewBox="`0 0 ${sizeNumber} ${sizeNumber}`">
    <circle
      class=""
      ref="path"
      :cx="center"
      :cy="center"
      :r="radius"
      fill="none"
      stroke-linecap="round"
      :stroke-width="thickness"
      :stroke="color"
      style="stroke-dasharray: 25px 1000px; stroke-dashoffset: 0px"
    />
  </svg>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

function getArcLength(percent, radius) {
  return percent * 2 * radius * Math.PI;
}

export default {
  name: 'WtLoadingCircle',
  props: {
    thickness: {
      type: Number,
      default: 2,
    },
    size: {
      type: Number,
      default: 20,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
    disableShrink: {
      type: Boolean,
      default: false,
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
    prefix() {
      return this.config.getPrefixCls('loading-circle');
    },
    sizeNumber() {
      return this.size;
    },
    diameter() {
      return getArcLength(1, (this.sizeNumber - this.thickness) / 2);
    },
    radius() {
      return (this.sizeNumber - this.thickness) / 2;
    },
    center() {
      return this.sizeNumber / 2;
    },
    style() {
      return {
        width: `${this.sizeNumber}px`,
        height: `${this.sizeNumber}px`,
      };
    },
  },
  watch: {
    disableShrink(n) {
      !n ? this.scalePath(this.$refs.path) : clearTimeout(this.scalePathTimer);
    },
  },
  mounted() {
    const {
      $refs: { path },
      disableShrink,
    } = this;
    if (!disableShrink) {
      this.scalePath(path);
    }
  },
  beforeDestroy() {
    clearTimeout(this.scalePathTimer);
  },
  methods: {
    scalePath(path, step = 0) {
      const { diameter } = this;
      step = step % 3;
      switch (step) {
        case 0:
          path.style.transitionDuration = '0ms';
          path.style.strokeDasharray = `3 ${diameter}`;
          path.style.strokeDashoffset = '0';
          break;
        case 1:
          path.style.transitionDuration = '700ms';
          path.style.strokeDasharray = `${0.7 * diameter} ${diameter}`;
          path.style.strokeDashoffset = -0.3 * diameter;
          break;
        case 2:
          path.style.transitionDuration = '700ms'; // 多出100ms用于显示最后一点
          path.style.strokeDasharray = `${0.7 * diameter} ${diameter}`;
          path.style.strokeDashoffset = 3 - diameter;
          // return
          break;
      }
      this.scalePathTimer = setTimeout(
        () => {
          this.scalePath(path, step + 1);
        },
        step ? 700 : 100,
      );
    },
  },
};
</script>
