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
    <div :class="[`${prefix}-body`]">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';
export default {
  name: 'WtCard',
  props: {
    // 标题
    title: {
      type: String,
    },
    // 副标题
    subtitle: {
      type: String,
    },
    // 说明文字
    caption: {
      type: String,
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
      return this.config.getPrefixCls('card');
    },
  },
};
</script>
