<template>
  <i :class="iconPrefix(name)" v-on="$listeners" />
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

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
  computed: {
    iconPrefix () {
      return this.config.getIconCls;
    },
  },
};
</script>
