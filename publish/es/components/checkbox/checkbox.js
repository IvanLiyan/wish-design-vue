import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Symbol from 'babel-runtime/core-js/symbol';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
import Icon from '@wish/wt-vue/es/components/icon';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('label', { class: _vm.wrapperCls, on: { "click": function click($event) {
        $event.preventDefault();return _vm.handleChange.apply(null, arguments);
      } } }, [_c('input', { staticStyle: { "display": "none" }, attrs: { "type": "checkbox", "name": _vm.name } }), _vm._v(" "), _c('span', { class: _vm.prefix + "-inner" }, [_vm.checked ? _c('Icon', { attrs: { "name": "check", "width": 10, "height": 10, "color": "#fff", "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" } }) : _vm._e()], 1), _vm._v(" "), _c('span', { class: _vm.prefix + "-text" }, [_vm._t("default")], 2), _vm._v(" "), _vm.$slots.hint ? _c('span', { class: _vm.prefix + "-hint" }, [_vm._t("hint")], 2) : _vm._e()]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtCheckbox',
  components: {
    Icon: Icon
  },
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
    // value
    value: [String, Number, Boolean, Function, Object, Array, _Symbol],
    // 是否选中
    checked: {
      type: Boolean,
      default: false
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // form输入控件checkbox的name
    name: String,
    // 注释内容
    hint: String
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('checkbox');
    },
    wrapperCls: function wrapperCls() {
      var _ref;

      var prefix = this.prefix;

      return [prefix, (_ref = {}, _defineProperty(_ref, prefix + '-checked', this.checked), _defineProperty(_ref, prefix + '-disabled', this.disabled), _ref)];
    }
  },
  methods: {
    /**
     * 改变值
     */
    handleChange: function handleChange($event) {
      if (!this.disabled) {
        this.$emit('input', !this.checked);
        this.$emit('change', !this.checked);
      }
    }
  }
};