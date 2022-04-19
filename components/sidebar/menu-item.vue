<template>
  <wt-menu-item v-bind="rest" :tooltip-props="tooltipProps"
    :tooltip="item.tooltip" :enabled-tooltip="item.enabledTooltip"
  >
    <!-- <i v-if="item.icon" :class="item.icon" slot="icon"></i> -->
    <slot :item="item">{{ item.title }}</slot>
  </wt-menu-item>
</template>
<script>
import WtMenuItem from '@components/menu-item';

export default {
  name: 'MenuItem',
  components: {
    WtMenuItem,
  },
  // inheritAttrs: false,
  props: {
    /**
     * @param {Object} item
     * @param {Router} route 路由跳转信息，详细请查看 route-link to 属性
     * @param {string} href 同 a 标签 href 属性
     */
    item: {
      type: Object,
      required: true,
    },
    itemKey: String,
    tooltipProps: {
      type: Object,
    },
  },
  computed: {
    rest () {
      const { item, itemKey } = this;
      return {
        name: item[itemKey],
        href: item.href,
        route: item.route,
        replace: item.replace,
        target: item.target,
        rel: item.rel,
        disabled: item.disabled,
        'active-class': item['active-class'],
        'exact-active-class': item['exact-active-class'],
        exact: item.exact,
      };
    },
  },
};
</script>
