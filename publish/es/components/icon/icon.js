import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var feather = require('feather-icons');

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('i', _vm._g(_vm._b({ class: _vm.prefix + " " + _vm.prefix + "-" + _vm.name, domProps: { "innerHTML": _vm._s(_vm.feather.icons[_vm.name].toSvg({
        color: _vm.color,
        width: _vm.width,
        height: _vm.height,
        'stroke-width': _vm.strokeWidth
      })) } }, 'i', _vm.$attrs, false), _vm.$listeners));
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    },

    strokeWidth: {
      type: Number,
      default: 2
    }
    // strokeLinecap: {
    //   type: String,
    //   default: 'butt', // butt | round | square
    // },
    // strokeLinejoin: {
    //   type: String,
    //   default: 'miter', // arcs | bevel |miter | miter-clip | round
    // },
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
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('icon');
    }
  }
};