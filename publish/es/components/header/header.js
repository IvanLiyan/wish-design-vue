import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('header', { class: _vm.prefix, style: { height: _vm.height } }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtHeader',

  props: {
    height: {
      type: String,
      default: '60px'
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
      return this.config.getPrefixCls('header');
    }
  }
};