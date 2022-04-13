<template>
  <div :class="[prefix, {
    [`${prefix}-collapse`]: collapse,
    [`${prefix}-${theme}`]: theme,
  }]">
    <div :class="`${prefix}-header`">
      <span :class="`${prefix}-header-title`">
        <slot name="title">{{ title }}</slot>
      </span>
      <span :class="`${prefix}-header-icon`" @click="toggle">
        <Icon :name="collapse ? 'expand' : 'collapse'"
          :class="`${menuPrefix}-title-backward`" />
      </span>
    </div>
    <div :class="`${prefix}-menus`">
      <slot name="menu">
        <wt-menu
          v-bind="$attrs"
          :theme="theme"
          :active-name="activeKey"
          :default-expanded-names="expandKeys"
          :collapse="collapse"
          :accordion="accordion"
          @expand-change="handleExpandChange"
          @input="handleMenuItemActive"

          :tooltip-props="tooltipProps"
          :item-key="itemKey"
        >
          <template v-for="item in data">
            <submenu v-if="item.children" :item-key="itemKey"
              :item="item" :key="item[itemKey]"
              :tooltip-props="tooltipProps"
            >
              <template v-if="$scopedSlots.submenu" slot="title" slot-scope="scope">
                <slot v-bind="scope" name="submenu"></slot>
              </template>
              <template v-if="$scopedSlots.item" slot="item" slot-scope="scope">
                <slot v-bind="scope" name="item"></slot>
              </template>
            </submenu>
            <menu-item v-else :item="item" :key="item[itemKey]"
              :item-key="itemKey" :tooltip-props="tooltipProps"
            >
              <template v-if="$scopedSlots.item" slot slot-scope="scope">
                <slot v-bind="scope" name="item"></slot>
              </template>
            </menu-item>
          </template>
        </wt-menu>
      </slot>
    </div>
  </div>
</template>
<script>
import WtMenu from '@components/smenu';
import Icon from '@components/icon';
import Submenu from './submenu.vue';
import MenuItem from './menu-item';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtSidebar',
  components: {
    WtMenu,
    Submenu,
    MenuItem,
    Icon,
  },
  inheritAttrs: false,
  model: {
    prop: 'activeKey',
  },
  props: {
    // 主题
    theme: {
      type: String,
      default: 'light',
    },
    collapse: Boolean,
    // 激活菜单名称
    activeKey: [Number, String],
    // 默认展开的菜单集合
    expandKeys: {
      type: Array,
      default () {
        return [];
      },
    },
    // 是否开启手风琴模式
    accordion: Boolean,
    data: Array,
    itemKey: {
      type: String,
      default: 'id',
    },
    title: {
      type: String,
      default: '',
    },
    tooltipProps: {
      type: Object,
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
    prefix () {
      return this.config.getPrefixCls('sidebar');
    },
    menuPrefix () {
      return this.config.getPrefixCls('menu');
    },
  },
  methods: {
    toggle () {
      const flag = !this.collapse;
      this.$emit('update:collapse', flag);
      this.$emit('collapse-change', flag);
    },
    getItem (key) {
      let result = null;
      const { itemKey } = this;
      function flat (item) {
        if (item[itemKey] === key) {
          result = item;
          return true;
        } else if (item.children) {
          item.children.some(flat);
        }
      }
      this.data.some(flat);
      return result;
    },
    handleMenuItemActive (key) {
      this.$emit('input', key);
      const item = this.getItem(key);
      this.$emit('menu-item-click', { key, item });
    },
    handleExpandChange (keys, extra) {
      this.$emit('update:expandKeys', keys);
      const { name, expanded } = extra;
      const item = this.getItem(extra.name);
      this.$emit('menu-expand-change', {
        item,
        expandKeys: keys,
        key: name,
        expanded,
      });
    },
  },
};
</script>
