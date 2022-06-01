import Icon from '@wish/wt-vue/es/components/icon';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.prefix }, [_vm.closable ? _c('span', { class: _vm.prefix + "-close", on: { "click": _vm.handleClose } }, [_c('Icon', { attrs: { "name": "x" } })], 1) : _vm._e(), _vm._v(" "), _vm.title || _vm.$slots.title ? _c('div', { class: _vm.prefix + "-header" }, [_vm._t("title", function () {
    return [_c('div', { class: _vm.prefix + "-title" }, [_vm._v(_vm._s(_vm.title))])];
  })], 2) : _vm._e(), _vm._v(" "), _c('div', { class: _vm.prefix + "-content-wrapper" }, [_c('div', { class: _vm.prefix + "-content" }, [_vm._t("default")], 2)]), _vm._v(" "), _vm.$slots.footer ? _c('div', { class: _vm.prefix + "-footer" }, [_vm._t("footer")], 2) : _vm._e()]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'Dialog',
  components: {
    Icon: Icon
  },
  inheritAttrs: false,
  props: {
    title: String,
    closable: Boolean
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
      return this.config.getPrefixCls('dialog');
    }
  },
  methods: {
    handleClose: function handleClose() {
      this.$emit('close');
    }
  }
};