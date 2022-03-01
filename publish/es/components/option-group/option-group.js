import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('ul', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], class: _vm.prefix + "-wrap" }, [_c('li', { class: _vm.prefix + "-title" }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('li', [_c('ul', { class: "" + _vm.prefix }, [_vm._t("default")], 2)]), _vm._v(" "), _vm._t("hr")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtOptionGroup',

  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
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

  data: function data() {
    return {
      visible: true
    };
  },
  provide: function provide() {
    return {
      group: this
    };
  },


  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('select-group');
    }
  }
};