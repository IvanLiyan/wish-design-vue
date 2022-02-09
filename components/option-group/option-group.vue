<template>
  <ul :class="`${prefix}-wrap`" v-show="visible">
    <li :class="`${prefix}-title`">{{ label }}</li>
    <li>
      <ul :class="`${prefix}`">
        <slot></slot>
      </ul>
    </li>
    <slot name="hr"></slot>
  </ul>
</template>

<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtOptionGroup',

  props: {
    label: String,
    disabled: {
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

  data() {
    return {
      visible: true,
    };
  },

  provide() {
    return {
      group: this,
    };
  },

  computed: {
    prefix() {
      return this.config.getPrefixCls('select-group');
    },
  },
};
</script>
