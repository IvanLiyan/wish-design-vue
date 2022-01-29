import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.prefix }, [_vm.$slots.caption || _vm.caption ? _c('div', { class: [_vm.prefix + "-caption"] }, [_vm._t("caption", function () {
    return [_vm._v(_vm._s(_vm.caption))];
  })], 2) : _vm._e(), _vm._v(" "), _vm.$slots.title || _vm.title ? _c('div', { class: [_vm.prefix + "-title"] }, [_vm._t("title", function () {
    return [_vm._v(_vm._s(_vm.title))];
  })], 2) : _vm._e(), _vm._v(" "), _vm.$slots.subtitle || _vm.subtitle ? _c('div', { class: [_vm.prefix + "-subtitle"] }, [_vm._t("subtitle", function () {
    return [_vm._v(_vm._s(_vm.subtitle))];
  })], 2) : _vm._e(), _vm._v(" "), _c('div', { class: [_vm.prefix + "-body", _vm.bodyClass] }, [_vm._t("default")], 2)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtCard',
  props: {
    caption: {
      type: String
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    bodyClass: String
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
      return this.config.getPrefixCls('card');
    }
  }
};