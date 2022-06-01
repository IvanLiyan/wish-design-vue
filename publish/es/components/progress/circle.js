import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('svg', { attrs: { "width": _vm.width, "height": _vm.width, "viewbox": _vm.viewbox } }, [_c('circle', { class: _vm.prefix + "-circle-outer", attrs: { "cx": _vm.cx, "cy": _vm.cx, "r": _vm.cr, "stroke-width": _vm.strokeWidth, "stroke": "currentColor", "fill": "none" } }), _vm._v(" "), _c('circle', { attrs: { "cx": _vm.cx, "cy": _vm.cx, "r": _vm.cr, "stroke-width": _vm.strokeWidth, "stroke": _vm.strokeColor, "stroke-linecap": "round", "fill": "none", "transform": _vm.transform, "stroke-dasharray": _vm.strokeDasharray } })]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtCircleProgress',
  props: {
    color: {
      type: String
    },
    strokeWidth: {
      type: Number,
      default: 5
    },
    width: {
      type: Number,
      default: 72
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: function validator(val) {
        return val >= 0 && val <= 100;
      }
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
      return this.config.getPrefixCls('progress');
    },
    strokeDasharray: function strokeDasharray() {
      var percent = this.percentage / 100;
      var perimeter = Math.PI * 2 * this.cr;
      return perimeter * percent + ' ' + perimeter * (1 - percent);
    },
    strokeColor: function strokeColor() {
      if (this.color) {
        return this.color;
      }
      return 'currentColor';
    },
    viewbox: function viewbox() {
      return '0 0 ' + this.width + ' ' + this.width;
    },
    cx: function cx() {
      return this.width / 2;
    },
    cr: function cr() {
      return this.cx - this.strokeWidth;
    },
    transform: function transform() {
      return 'matrix(0,-1,1,0,0,' + this.width + ')';
    }
  }
};