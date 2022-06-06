<template>
  <span :class="prefix">
    <component :is="tag" v-bind="$attrs" :class="`${breadcrumbPrefix}-inner`">
      <slot></slot>
    </component>
    <wt-icon
      v-if="separatorClass || !separator"
      :class="[`${breadcrumbPrefix}-separator`]"
      name="chevron-right"
      color="#0E161C"
      :width="12"
      :height="12"
    />
    <span v-else :class="`${breadcrumbPrefix}-separator`">{{ separator }}</span>
  </span>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

export default {
  name: 'WtBreadcrumbItem',
  inheritAttrs: false,
  props: {
    tag: {
      type: [String, Object],
      default: 'span',
    },
  },
  data() {
    return {
      slotText: this.$slots.default[0].text,
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('breadcrumb-item');
    },
    breadcrumbPrefix() {
      return this.config.getPrefixCls('breadcrumb');
    },
    getIcon() {
      return this.config.getIconCls;
    },
    separator() {
      return this.breadcrumb.separator;
    },
    separatorClass() {
      return this.breadcrumb.separatorClass;
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
    toLink(event) {
      console.log(event);
    },
  },
};
</script>
