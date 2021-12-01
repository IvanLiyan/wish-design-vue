import _defineProperty from 'babel-runtime/helpers/defineProperty';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { class: _vm.wrapperCls, on: { "click": function click($event) {
        $event.preventDefault();return _vm.handleClick.apply(null, arguments);
      } } }, [_c('span', { class: _vm.prefix + "-btn" }), _vm._v(" "), _c('span', { class: _vm.prefix + "-text" }, [_vm._t("default")], 2), _vm._v(" "), _vm.$slots.hint ? _c('span', { class: _vm.prefix + "-hint" }, [_vm._t("hint")], 2) : _vm._e()]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtSwitch',
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
    value: {},
    trueValue: {
      default: true
    },
    falseValue: {
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
      return this.config.getPrefixCls('switch');
    },
    checked: function checked() {
      return this.value === this.trueValue;
    },
    wrapperCls: function wrapperCls() {
      var _ref;

      var prefix = this.prefix;

      return [prefix, (_ref = {}, _defineProperty(_ref, prefix + '-active', this.checked), _defineProperty(_ref, prefix + '-disabled', this.disabled), _ref)];
    }
  },
  methods: {
    handleClick: function handleClick(e) {
      if (this.disabled || this.loading) {
        return false;
      }
      var value = this.checked ? this.falseValue : this.trueValue;
      this.$emit('change', value);
      this.$emit('input', value);
    }
  }
};