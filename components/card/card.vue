<template>
<div :class="prefix">
  <div :class="[`${prefix}-caption`]" v-if="$slots.caption || caption">
    <slot name="caption">{{ caption }}</slot>
  </div>
  <div :class="[`${prefix}-title`]" v-if="$slots.title || title">
    <slot name="title">{{ title }}</slot>
  </div>
  <div :class="[`${prefix}-subtitle`]" v-if="$slots.subtitle || subtitle">
    <slot name="subtitle">{{ subtitle }}</slot>
  </div>
  <div :class="[`${prefix}-body`, bodyClass]">
    <slot></slot>
  </div>
</div>
</template>
<script>
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';
export default {
  name: 'WtCard',
  props: {
    caption: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    bodyClass: String,
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
      return this.config.getPrefixCls('card');
    },
  },
};
</script>
