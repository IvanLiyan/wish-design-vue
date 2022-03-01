import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.prefix + "-bar", style: { height: _vm.strokeWidth + "px" } }, [_c('div', { class: _vm.prefix + "-bar-outer" }, [_c('div', { class: _vm.prefix + "-bar-inner", style: {
      width: (_vm.percentage > 100 ? 100 : _vm.percentage) + "%",
      background: _vm.color
    } })])]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'MtdLineProgress',
  props: {
    color: {
      type: String
    },
    strokeWidth: {
      type: Number,
      default: 8
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: function validator(val) {
        return val >= 0;
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
    }
  }
};