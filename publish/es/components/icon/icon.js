import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wd-vue/es/utils/config';
var feather = require('feather-icons');

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('i', _vm._g({ domProps: { "innerHTML": _vm._s(_vm.feather.icons[_vm.name].toSvg()) } }, _vm.$listeners));
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WdIcon',
  props: {
    name: {
      type: String,
      required: true
    }
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
  data: function data() {
    return {
      feather: feather
    };
  }
};