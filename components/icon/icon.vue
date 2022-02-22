<template>
  <i
    :class="`${prefix} ${prefix}-${name}`"
    v-bind="$attrs"
    v-on="$listeners"
    v-html="
      config.feather.icons[name].toSvg({
        color,
        width,
        height,
        'stroke-width': strokeWidth,
        'stroke-line-cap': strokeLinecap,
        'stroke-linejoin': strokeLinejoin,
      })
    "
  ></i>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

const feather = require('feather-icons');

export default {
  name: 'WtIcon',
  props: {
    // 名称
    name: {
      type: String,
      required: true,
    },
    // 颜色
    color: {
      type: String,
    },
    // 宽度
    width: {
      type: Number,
      default: 24,
    },
    // 高度
    height: {
      type: Number,
      default: 24,
    },
    // 线条粗细
    strokeWidth: {
      type: Number,
      default: 2,
    },
    // 线条边缘形状
    strokeLinecap: {
      type: String,
      default: 'butt', // butt | round | square
    },
    // 线条衔接处形状
    strokeLinejoin: {
      type: String,
      default: 'miter', // arcs | bevel |miter | miter-clip | round
    },
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
        feather,
      },
    },
  },
  data: function () {
    return {};
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('icon');
    },
  },
};
</script>
