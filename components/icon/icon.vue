<template>
  <i
    :class="prefix"
    v-on="$listeners"
    v-html="
      feather.icons[name].toSvg({
        color,
        width,
        height,
        'stroke-width': strokeWidth,
      })
    "
  />
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

const feather = require('feather-icons');

export default {
  name: 'WdIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },

    strokeWidth: {
      type: Number,
      default: 2,
    },
    // strokeLinecap: {
    //   type: String,
    //   default: 'butt', // butt | round | square
    // },
    // strokeLinejoin: {
    //   type: String,
    //   default: 'miter', // arcs | bevel |miter | miter-clip | round
    // },
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
      },
    },
  },
  data: function () {
    return {
      feather,
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('icon');
    },
  },
};
</script>
