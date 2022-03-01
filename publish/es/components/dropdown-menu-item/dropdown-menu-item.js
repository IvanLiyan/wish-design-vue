import _extends from 'babel-runtime/helpers/extends';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', _vm._g({ class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj) }, _vm.listeners), [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtDropdownMenuItem',
  props: {
    disabled: Boolean
  },
  inject: {
    dropdown: {
      default: ''
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  computed: {
    listeners: function listeners() {
      return _extends({}, this.$listeners, {
        click: this.handleClick
      });
    },
    prefix: function prefix() {
      return this.config.getPrefixCls('dropdown-menu-item');
    }
  },
  methods: {
    handleClick: function handleClick(e) {
      if (this.disabled) {
        return;
      }
      this.$emit('click', e);
      if (this.dropdown) {
        this.dropdown.$emit('itemClick', e);
      }
    }
  }
};