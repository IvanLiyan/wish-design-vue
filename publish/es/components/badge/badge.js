import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.prefix }, [_vm._t("default"), _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.text || _vm.text === 0 || _vm.dot, expression: "text || text === 0 || dot" }], class: (_obj = {}, _obj[_vm.prefix + "-text"] = true, _obj[_vm.prefix + "-position"] = _vm.$slots.default, _obj[_vm.prefix + "-dot"] = _vm.dot, _obj[_vm.prefix + "-hidden"] = _vm.hidden, _obj[_vm.prefix + "-rounded"] = _vm.rounded, _obj), domProps: { "textContent": _vm._s(_vm.text) } })], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtBadge',

  props: {
    value: [String, Number],
    dot: Boolean,
    max: Number,
    hidden: Boolean
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
      return this.config.getPrefixCls('badge');
    },
    text: function text() {
      var dot = this.dot,
          value = this.value,
          max = this.max;

      if (dot) {
        return;
      }
      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? max + '+' : value;
      }

      return value;
    },
    rounded: function rounded() {
      return String(this.text).length === 1;
    }
  }
};