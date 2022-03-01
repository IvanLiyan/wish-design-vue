<template>
  <component
    v-if="isCustomIcon"
    :is="CustomIconView"
    v-bind="$attrs"
    v-on="$listeners"
    :class="`${prefix} ${prefix}-${name}`"
    :fill="color"
    :color="color"
    :width="width"
    :height="height"
    :stroke-width="strokeWidth"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
  />
  <i
    v-else
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
// 引入自定义组件
import CheckCircle from './custom-icon/check-circle.vue';

const feather = require('feather-icons');
const customIconNames = ['check-circle'];

export default {
  name: 'WtIcon',
  components: {
    CheckCircle,
  },
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
    // components中已注册组件，可使用name作为组件名直接使用组件
    return {
      CustomIconView: this._props.name,
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('icon');
    },
    // 判断是否是自定义组件
    isCustomIcon: function () {
      return customIconNames.includes(this.name);
    },
  },
};
</script>
