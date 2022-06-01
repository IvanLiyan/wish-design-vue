<template>
  <ul
    :class="{
      [prefix]: true,
      [`${prefix}-empty`]: isEmpty,
      [`${prefix}-filtered`]: filtered
    }"
    :style="styles"
  >
    <menu-item v-for="(node, $index) in nodes" :key="$index"
      :node="node" :value="value" :filtered="filtered"
      v-on="$listeners"
    >
      <template slot-scope="{ node, data }" v-if="$scopedSlots.default">
        <slot :node="node" :data="data"></slot>
      </template>
    </menu-item>
    <li :class="`${prefix}-empty-item`" v-if="isEmpty">
      <slot name="empty">
        <i :class="`${iconPrefix('info-circle')} ${prefix}-empty-icon`"></i>
        {{ filtered ? noMatchText : noDataText }}
      </slot>
    </li>
  </ul>
</template>
<script>
import MenuItem from './menu-item';
import { CONFIG_PROVIDER,
  getPrefixCls,
  getIconCls,
} from '@/utils/config';

export default {
  name: 'CascaderMenu',
  components: {
    MenuItem,
  },
  inheritAttrs: false,
  props: {
    nodes: Array,
    noDataText: String,
    noMatchText: String,
    filtered: Boolean,
    menuWidth: String,
    value: [String, Number, Object],
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
    prefix () {
      return this.config.getPrefixCls('cascader-menu');
    },
    iconPrefix () {
      return this.config.getIconCls;
    },
    isEmpty () {
      return !this.nodes.length;
    },
    styles () {
      if (this.filtered) {
        return {
          'min-width': this.menuWidth,
        };
      }
      return {};
    },
  },
};
</script>
