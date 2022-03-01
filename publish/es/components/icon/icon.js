import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';
// 引入自定义组件
import CheckCircle from './custom-icon/check-circle';

var feather = require('feather-icons');
var customIconNames = ['check-circle'];

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.isCustomIcon ? _c(_vm.CustomIconView, _vm._g(_vm._b({ tag: "component", class: _vm.prefix + " " + _vm.prefix + "-" + _vm.name, attrs: { "fill": _vm.color, "color": _vm.color, "width": _vm.width, "height": _vm.height, "stroke-width": _vm.strokeWidth, "stroke-linecap": _vm.strokeLinecap, "stroke-linejoin": _vm.strokeLinejoin } }, 'component', _vm.$attrs, false), _vm.$listeners)) : _c('i', _vm._g(_vm._b({ class: _vm.prefix + " " + _vm.prefix + "-" + _vm.name, domProps: { "innerHTML": _vm._s(_vm.config.feather.icons[_vm.name].toSvg({
        color: _vm.color,
        width: _vm.width,
        height: _vm.height,
        'stroke-width': _vm.strokeWidth,
        'stroke-line-cap': _vm.strokeLinecap,
        'stroke-linejoin': _vm.strokeLinejoin
      })) } }, 'i', _vm.$attrs, false), _vm.$listeners));
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtIcon',
  components: {
    CheckCircle: CheckCircle
  },
  props: {
    // 名称
    name: {
      type: String,
      required: true
    },
    // 颜色
    color: {
      type: String
    },
    // 宽度
    width: {
      type: Number,
      default: 24
    },
    // 高度
    height: {
      type: Number,
      default: 24
    },
    // 线条粗细
    strokeWidth: {
      type: Number,
      default: 2
    },
    // 线条边缘形状
    strokeLinecap: {
      type: String,
      default: 'butt' // butt | round | square
    },
    // 线条衔接处形状
    strokeLinejoin: {
      type: String,
      default: 'miter' // arcs | bevel |miter | miter-clip | round
    }
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconCls: getIconCls,
        feather: feather
      }
    }
  },

  data: function data() {
    // components中已注册组件，可使用name作为组件名直接使用组件
    return {
      CustomIconView: this._props.name
    };
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('icon');
    },

    // 判断是否是自定义组件
    isCustomIcon: function isCustomIcon() {
      return customIconNames.includes(this.name);
    }
  }
};