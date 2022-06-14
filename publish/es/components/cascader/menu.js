import MenuItem from './menu-item';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-empty"] = _vm.isEmpty, _obj[_vm.prefix + "-filtered"] = _vm.filtered, _obj), style: _vm.styles }, [_vm._l(_vm.nodes, function (node, $index) {
    return _c('menu-item', _vm._g({ key: $index, attrs: { "node": node, "value": _vm.value, "filtered": _vm.filtered }, scopedSlots: _vm._u([{ key: "default", fn: function fn(ref) {
          var node = ref.node;
          var data = ref.data;
          return _vm.$scopedSlots.default ? [_vm._t("default", null, { "node": node, "data": data })] : undefined;
        } }], null, true) }, _vm.$listeners));
  }), _vm._v(" "), _vm.isEmpty ? _c('li', { class: _vm.prefix + "-empty-item" }, [_vm._t("empty", function () {
    return [_c('i', { class: _vm.iconPrefix('info-circle') + " " + _vm.prefix + "-empty-icon" }), _vm._v("\n      " + _vm._s(_vm.filtered ? _vm.noMatchText : _vm.noDataText) + "\n    ")];
  })], 2) : _vm._e()], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'CascaderMenu',
  components: {
    MenuItem: MenuItem
  },
  inheritAttrs: false,
  props: {
    nodes: Array,
    noDataText: String,
    noMatchText: String,
    filtered: Boolean,
    menuWidth: String,
    value: [String, Number, Object]
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconCls: getIconCls
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('cascader-menu');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconCls;
    },
    isEmpty: function isEmpty() {
      return !this.nodes.length;
    },
    styles: function styles() {
      if (this.filtered) {
        return {
          'min-width': this.menuWidth
        };
      }
      return {};
    }
  }
};