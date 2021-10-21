import _extends from 'babel-runtime/helpers/extends';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wd-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('button', _vm._g({ class: [_vm.prefix, _vm.type ? _vm.prefix + "-" + _vm.type : '', _vm.size ? _vm.prefix + "-" + _vm.size : '', (_obj = {}, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj[_vm.btnPrefix + "-clicked"] = _vm.clicked, _obj)], attrs: { "type": _vm.htmlType, "disabled": _vm.disabled } }, _vm.listen), [_vm._t("default", function () {
    return [_c('i', { class: _vm.icon })];
  })], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WdIconButton',
  props: {
    icon: String,
    disabled: Boolean,
    htmlType: {
      type: String,
      default: 'button'
    },
    size: String,
    type: String
  },
  data: function data() {
    return {
      clicked: false
    };
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
      return this.config.getPrefixCls('icon-btn');
    },
    btnPrefix: function btnPrefix() {
      return this.config.getPrefixCls('btn');
    },
    listen: function listen() {
      return _extends({}, this.$listeners, {
        click: this.handleClick
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.timeout);
  },

  methods: {
    handleClick: function handleClick(e) {
      var _this = this;

      clearTimeout(this.timeout);
      this.clicked = true;
      this.$emit('click', e);
      this.timeout = setTimeout(function () {
        _this.clicked = false;
      }, 500);
    }
  }
};