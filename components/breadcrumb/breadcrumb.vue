<template v-slot:default="slotProps">
  <div :class="`${prefix}-wrapper`">
    <div v-if="showBackIcon" :class="`${prefix}-title`">
      <wt-icon
        :class="`${prefix}-title-icon`"
        name="arrow-left"
        :width="24"
        :height="24"
        color="#7790A3"
        @click="goBack"
      />
      <span :class="`${prefix}-title-text`">{{ slotTitle }}</span>
    </div>
    <div v-else-if="!showBackIcon && showTitle" :class="`${prefix}-title`">
      <span :class="`${prefix}-title-text`">{{ slotTitle }}</span>
    </div>
    <div :class="prefix">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';

export default {
  name: 'WtBreadcrumb',
  props: {
    // 显示标题
    showTitle: {
      type: Boolean,
      default: false,
    },
    // 显示返回按钮
    showBackIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 获取slot的dom
      slotVNode: this.$slots.default.slice(-1),
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('breadcrumb');
    },
    // 获取标题
    slotTitle() {
      return this.slotVNode[0].componentOptions.children[0].text;
    },
  },
  provide() {
    return {
      breadcrumb: this,
    };
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
  methods: {
    /**
     * 返回上一页
     */
    goBack() {
      window.history.go(-1);
    },
  },
};
</script>
