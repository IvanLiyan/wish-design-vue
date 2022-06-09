<template>
  <span :class="prefix">
    <component :is="tag" v-bind="$attrs" :class="`${breadcrumbPrefix}-inner`">
      <slot></slot>
    </component>
    <wt-icon :class="[`${breadcrumbPrefix}-separator`]" name="chevron-right" color="#0E161C" :width="12" :height="12" />
  </span>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

export default {
  name: 'WtBreadcrumbItem',
  inheritAttrs: false,
  props: {
    // 动态组件名
    tag: {
      type: [String, Object],
      default: 'span',
    },
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('breadcrumb-item');
    },
    breadcrumbPrefix() {
      return this.config.getPrefixCls('breadcrumb');
    },
  },
  inject: {
    breadcrumb: {
      from: 'breadcrumb',
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
      },
    },
  },
  methods: {
    /**
     * 跳转链接
     */
    toLink(event) {
      console.log(event);
    },
  },
};
</script>
