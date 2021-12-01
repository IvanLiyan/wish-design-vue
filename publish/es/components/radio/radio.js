import _defineProperty from 'babel-runtime/helpers/defineProperty';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('label', { class: _vm.wrapperCls, on: { "click": function click($event) {
        $event.preventDefault();return _vm.handleClick.apply(null, arguments);
      } } }, [_c('input', { staticStyle: { "display": "none" }, attrs: { "type": "radio", "name": _vm.name } }), _vm._v(" "), _c('span', { class: _vm.prefix + "-inner" }), _vm._v(" "), _c('span', { class: _vm.prefix + "-text" }, [_vm._t("default")], 2), _vm._v(" "), _vm.$slots.hint ? _c('span', { class: _vm.prefix + "-hint" }, [_vm._t("hint")], 2) : _vm._e()]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtRadio',
  inheritAttrs: false,
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  props: {
    // value: [String, Number, Boolean, Function, Object, Array, Symbol],
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: String,
    hint: String
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('radio');
    },
    wrapperCls: function wrapperCls() {
      var _ref;

      var prefix = this.prefix;

      return [prefix, (_ref = {}, _defineProperty(_ref, prefix + '-checked', this.checked), _defineProperty(_ref, prefix + '-disabled', this.disabled), _ref)];
    }
  },
  methods: {
    handleClick: function handleClick($event) {
      if (!this.disabled && !this.checked) {
        this.$emit('change', true);
        this.$emit('input', true);
      }
      if (!this.disabled) {
        this.$emit('click', $event);
      }
    }
  }
};