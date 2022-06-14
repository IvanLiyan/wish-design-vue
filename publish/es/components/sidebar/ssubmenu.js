import SmenuItem from './menu-item';
import WtSsubmenu from '@wish/wt-vue/es/components/ssubmenu';
import Icon from '@wish/wt-vue/es/components/icon';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-ssubmenu', _vm._b({ attrs: { "name": _vm.item[_vm.itemKey], "disabled": _vm.item.disabled, "tooltip": _vm.item.tooltip, "tooltip-props": _vm.tooltipProps, "enabled-tooltip": _vm.item.enabledTooltip } }, 'wt-ssubmenu', _vm.$attrs, false), [_vm.item.icon ? _c('Icon', { attrs: { "slot": "icon", "name": _vm.item.icon, "width": 17, "height": 17 }, slot: "icon" }) : _vm._e(), _vm._v(" "), _c('span', { attrs: { "slot": "title" }, slot: "title" }, [_vm._t("title", function () {
    return [_vm._v(_vm._s(_vm.item.title))];
  }, { "item": _vm.item })], 2), _vm._v(" "), _vm._l(_vm.item.children, function (child) {
    return _c(child.children ? 'ssubmenu' : 'smenu-item', { key: child[_vm.itemKey], tag: "component", attrs: { "item": child, "item-key": _vm.itemKey, "tooltip-props": _vm.tooltipProps }, scopedSlots: _vm._u([{ key: "title", fn: function fn(scope) {
          return _vm.$scopedSlots.title ? [_vm._t("title", null, null, scope)] : undefined;
        } }, { key: "item", fn: function fn(scope) {
          return _vm.$scopedSlots.item ? [_vm._t("item", null, null, scope)] : undefined;
        } }, { key: "default", fn: function fn(scope) {
          return _vm.$scopedSlots.item ? [_vm._t("item", null, null, scope)] : undefined;
        } }], null, true) });
  })], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'Ssubmenu',
  components: {
    SmenuItem: SmenuItem,
    WtSsubmenu: WtSsubmenu,
    Icon: Icon
  },
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      required: true
    },
    itemKey: String,
    tooltipProps: {
      type: Object
    }
  }
};