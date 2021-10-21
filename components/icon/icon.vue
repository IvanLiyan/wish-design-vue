<template>
  <i v-on="$listeners" v-html="feather.icons[name].toSvg()" />
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
};
</script>
