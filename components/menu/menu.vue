<template>
  <ul role="menu" :class="{
    [`${prefix}`]: true,
    [`${prefix}-collapse`]: isCollapse,
    [`${prefix}-${theme}`]: theme,
    [`${prefix}-${mode}`]: mode,
  }">
    <slot></slot>
  </ul>
</template>
<script>
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WtMenu',
  inheritAttrs: false,
  model: {
    prop: 'activeName',
  },
  provide () {
    return {
      menu: this,
    };
  },
  props: {
    mode: {
      type: String,
      default: 'inline',
      validator (value) {
        return ['vertical', 'horizontal', 'inline'].indexOf(value) > -1;
      },
    },
    theme: {
      type: String,
      default: 'light',
    },
    activeName: [String, Number],
    expandedNames: {
      type: Array,
      default () {
        return [];
      },
    },
    defaultExpandedNames: {
      type: Array,
      default () {
        return [];
      },
    },
    accordion: Boolean,
    collapse: Boolean,
    router: Boolean,
    indent: {
      type: Number,
      default: 24,
    },
    baseIndent: {
      type: Number,
      default: 24,
    },
    lazy: Boolean,
  },
  data () {
    return {
      level: -1, // root
      innerExpandedNames: this.defaultExpandedNames,
      isExpandedControl: 'expandedNames' in this.$options.propsData,
      lastExpended: [],
      foundedActivedItem: false,
    };
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
      return this.config.getPrefixCls('menu');
    },
    isCollapse () {
      return this.collapse && this.mode === 'inline';
    },
    expanded () {
      if (this.isExpandedControl) {
        return this.expandedNames;
      }
      return this.innerExpandedNames;
    },
  },
  watch: {
    collapse (n) {
      if (n) {
        this.lastExpended = this.innerExpandedNames;
        this.innerExpandedNames = [];
      } else {
        this.innerExpandedNames = this.lastExpended;
      }
    },
    defaultExpandedNames () {
      this.innerExpandedNames = this.defaultExpandedNames;
    },
    activeName: {
      immediate: true,
      handler (n) {
        this.foundedActivedItem = (!n && n !== 0); // 有值则重新计算
      },
    },
  },
  created () {
    this.$on('menuItemClick', this.handleMenuItemClick);
    this.$on('item-matched', this.handleFounded);
  },
  methods: {
    isActive (menuItem) {
      return this.activeName === menuItem.name;
    },
    isExpanded (submenu) {
      return this.expanded.indexOf(submenu.name) > -1;
    },
    getItemStyled (item) {
      if ((this.mode === 'inline' && !this.isCollapse) ||
        ((this.mode === 'vertical' || this.isCollapse) && item.level === 0)) {
        return { paddingLeft: `${item.paddingLeft}px` };
      }
    },
    handleFounded () {
      this.foundedActivedItem = true;
    },
    handleMenuItemClick (item) {
      this.$emit('input', item.name);
      this.$emit('select', item);
    },
    toggleExpanded (item) {
      let nextExpanded = [];
      const { name: key } = item;
      if (!item.isExpanded) {
        if (this.accordion) {
          const keys = this.getParentKeys(item);
          nextExpanded = keys;
        } else {
          nextExpanded = [...this.expanded];
          nextExpanded.push(key);
        }
        this.$emit('open', key);
      } else {
        const index = this.expanded.indexOf(key);
        if (index > -1) {
          nextExpanded = [...this.expanded];
          nextExpanded.splice(index, 1);
        }
        this.$emit('close', key);
      }
      this.$emit('update:expandedNames', nextExpanded);
      this.$emit('expand-change', nextExpanded, {
        name: key,
        expanded: !item.isExpanded,
      });
      this.innerExpandedNames = nextExpanded;
    },
    getParentKeys (it) {
      const keys = [];
      function flat (item) {
        const { submenu } = item;
        keys.push(item.name);
        if (submenu) {
          flat(submenu);
        }
      }
      flat(it);
      return keys;
    },
  },
};
</script>
