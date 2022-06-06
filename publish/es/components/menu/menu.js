import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { class: (_obj = {}, _obj["" + _vm.prefix] = true, _obj[_vm.prefix + "-collapse"] = _vm.isCollapse, _obj[_vm.prefix + "-" + _vm.theme] = _vm.theme, _obj[_vm.prefix + "-" + _vm.mode] = _vm.mode, _obj), attrs: { "role": "menu" } }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtMenu',
  inheritAttrs: false,
  model: {
    prop: 'activeName'
  },
  provide: function provide() {
    return {
      menu: this
    };
  },

  props: {
    mode: {
      type: String,
      default: 'horizontal',
      validator: function validator(value) {
        return ['vertical', 'horizontal', 'inline'].indexOf(value) > -1;
      }
    },
    theme: {
      type: String,
      default: 'light'
    },
    activeName: [String, Number],
    expandedNames: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    defaultExpandedNames: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    accordion: Boolean,
    collapse: Boolean,
    router: Boolean,
    indent: {
      type: Number,
      default: 24
    },
    baseIndent: {
      type: Number,
      default: 24
    },
    lazy: Boolean
  },
  data: function data() {
    return {
      level: -1, // root
      innerExpandedNames: this.defaultExpandedNames,
      isExpandedControl: 'expandedNames' in this.$options.propsData,
      lastExpended: [],
      foundedActivedItem: false
    };
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('menu');
    },
    isCollapse: function isCollapse() {
      return this.collapse && this.mode === 'inline';
    },
    expanded: function expanded() {
      if (this.isExpandedControl) {
        return this.expandedNames;
      }
      return this.innerExpandedNames;
    }
  },
  watch: {
    collapse: function collapse(n) {
      if (n) {
        this.lastExpended = this.innerExpandedNames;
        this.innerExpandedNames = [];
      } else {
        this.innerExpandedNames = this.lastExpended;
      }
    },
    defaultExpandedNames: function defaultExpandedNames() {
      this.innerExpandedNames = this.defaultExpandedNames;
    },

    activeName: {
      immediate: true,
      handler: function handler(n) {
        this.foundedActivedItem = !n && n !== 0; // 有值则重新计算
      }
    }
  },
  created: function created() {
    this.$on('menuItemClick', this.handleMenuItemClick);
    this.$on('item-matched', this.handleFounded);
  },

  methods: {
    isActive: function isActive(menuItem) {
      return this.activeName === menuItem.name;
    },
    isExpanded: function isExpanded(submenu) {
      return this.expanded.indexOf(submenu.name) > -1;
    },
    getItemStyled: function getItemStyled(item) {
      if (this.mode === 'inline' && !this.isCollapse || (this.mode === 'vertical' || this.isCollapse) && item.level === 0) {
        return { paddingLeft: item.paddingLeft + 'px' };
      }
    },
    handleFounded: function handleFounded() {
      this.foundedActivedItem = true;
    },
    handleMenuItemClick: function handleMenuItemClick(item) {
      this.$emit('input', item.name);
      this.$emit('select', item);
    },
    toggleExpanded: function toggleExpanded(item) {
      var nextExpanded = [];
      var key = item.name;

      if (!item.isExpanded) {
        if (this.accordion) {
          var keys = this.getParentKeys(item);
          nextExpanded = keys;
        } else {
          nextExpanded = [].concat(_toConsumableArray(this.expanded));
          nextExpanded.push(key);
        }
        this.$emit('open', key);
      } else {
        var index = this.expanded.indexOf(key);
        if (index > -1) {
          nextExpanded = [].concat(_toConsumableArray(this.expanded));
          nextExpanded.splice(index, 1);
        }
        this.$emit('close', key);
      }
      this.$emit('update:expandedNames', nextExpanded);
      this.$emit('expand-change', nextExpanded, {
        name: key,
        expanded: !item.isExpanded
      });
      this.innerExpandedNames = nextExpanded;
    },
    getParentKeys: function getParentKeys(it) {
      var keys = [];
      function flat(item) {
        var submenu = item.submenu;

        keys.push(item.name);
        if (submenu) {
          flat(submenu);
        }
      }
      flat(it);
      return keys;
    },
    clearInnerExpandedNames: function clearInnerExpandedNames() {
      this.innerExpandedNames = [];
    }
  }
};