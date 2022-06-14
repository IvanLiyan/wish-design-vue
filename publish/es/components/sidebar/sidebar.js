import WtSmenu from '@wish/wt-vue/es/components/smenu';
import Icon from '@wish/wt-vue/es/components/icon';
import Ssubmenu from './ssubmenu';
import SmenuItem from './menu-item';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.prefix, (_obj = {}, _obj[_vm.prefix + "-collapse"] = _vm.collapse, _obj[_vm.prefix + "-" + _vm.theme] = _vm.theme, _obj)] }, [_c('div', { class: _vm.prefix + "-header" }, [_c('span', { class: _vm.prefix + "-header-title" }, [_vm._t("title", function () {
    return [_vm._v(_vm._s(_vm.title))];
  })], 2)]), _vm._v(" "), _c('div', { class: _vm.prefix + "-smenus" }, [_vm._t("smenu", function () {
    return [_c('wt-smenu', _vm._b({ attrs: { "theme": _vm.theme, "active-name": _vm.activeKey, "default-expanded-names": _vm.expandKeys, "collapse": _vm.collapse, "accordion": _vm.accordion, "tooltip-props": _vm.tooltipProps, "item-key": _vm.itemKey }, on: { "expand-change": _vm.handleExpandChange, "input": _vm.handleMenuItemActive } }, 'wt-smenu', _vm.$attrs, false), [_vm._l(_vm.data, function (item) {
      return [item.children ? _c('ssubmenu', { key: item[_vm.itemKey], attrs: { "item-key": _vm.itemKey, "item": item, "tooltip-props": _vm.tooltipProps }, scopedSlots: _vm._u([{ key: "title", fn: function fn(scope) {
            return _vm.$scopedSlots.ssubmenu ? [_vm._t("ssubmenu", null, null, scope)] : undefined;
          } }, { key: "item", fn: function fn(scope) {
            return _vm.$scopedSlots.item ? [_vm._t("item", null, null, scope)] : undefined;
          } }], null, true) }) : _c('smenu-item', { key: item[_vm.itemKey], attrs: { "item": item, "item-key": _vm.itemKey, "tooltip-props": _vm.tooltipProps }, scopedSlots: _vm._u([{ key: "default", fn: function fn(scope) {
            return _vm.$scopedSlots.item ? [_vm._t("item", null, null, scope)] : undefined;
          } }], null, true) })];
    })], 2)];
  })], 2)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtSidebar',
  components: {
    WtSmenu: WtSmenu,
    Ssubmenu: Ssubmenu,
    SmenuItem: SmenuItem,
    Icon: Icon
  },
  inheritAttrs: false,
  model: {
    prop: 'activeKey'
  },
  props: {
    // 主题
    theme: {
      type: String,
      default: 'light'
    },
    collapse: Boolean,
    // 激活菜单名称
    activeKey: [Number, String],
    // 默认展开的菜单集合
    expandKeys: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 是否开启手风琴模式
    accordion: Boolean,
    data: Array,
    itemKey: {
      type: String,
      default: 'id'
    },
    title: {
      type: String,
      default: ''
    },
    tooltipProps: {
      type: Object
    }
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
      return this.config.getPrefixCls('sidebar');
    },
    menuPrefix: function menuPrefix() {
      return this.config.getPrefixCls('menu');
    }
  },
  methods: {
    toggle: function toggle() {
      var flag = !this.collapse;
      this.$emit('update:collapse', flag);
      this.$emit('collapse-change', flag);
    },
    getItem: function getItem(key) {
      var result = null;
      var itemKey = this.itemKey;

      function flat(item) {
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
    handleMenuItemActive: function handleMenuItemActive(key) {
      this.$emit('input', key);
      var item = this.getItem(key);
      this.$emit('menu-item-click', { key: key, item: item });
    },
    handleExpandChange: function handleExpandChange(keys, extra) {
      this.$emit('update:expandKeys', keys);
      var name = extra.name,
          expanded = extra.expanded;

      var item = this.getItem(extra.name);
      this.$emit('menu-expand-change', {
        item: item,
        expandKeys: keys,
        key: name,
        expanded: expanded
      });
    }
  }
};