import _defineProperty from 'babel-runtime/helpers/defineProperty';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

import Icon from '@wish/wt-vue/es/components/icon';
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('i', { class: _vm.wrapperCls, on: { "click": function click($event) {
        $event.preventDefault();return _vm.handleClick.apply(null, arguments);
      } } }, [_c('span', [_vm._t("default")], 2), _vm._v(" "), _vm.clearable ? _c('Icon', { attrs: { "name": "x" }, on: { "click": function click($event) {
        $event.stopPropagation();return _vm.handleClose.apply(null, arguments);
      } } }) : _vm._e()], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtTag',
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
    size: {
      default: 'normal',
      range: ['normal', 'large']
    },
    rounded: {
      type: Boolean,
      default: false
    },
    type: {
      default: 'default',
      range: ['default', 'primary', 'success', 'danger', 'warning']
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('tag');
    },
    radius: function radius() {
      return this.rounded ? 'round' : 'square';
    },
    wrapperCls: function wrapperCls() {
      var _ref;

      var prefix = this.prefix;

      return [prefix, prefix + '-' + this.type, prefix + '-' + this.size, prefix + '-' + this.radius, (_ref = {}, _defineProperty(_ref, prefix + '-disabled', this.disabled), _defineProperty(_ref, prefix + '-clickable', !!this.$listeners.click), _ref)];
    }
  },
  methods: {
    handleClick: function handleClick(e) {
      if (this.disabled) {
        return false;
      }
      this.$emit('click', e);
    },
    handleClose: function handleClose(e) {
      if (this.disabled) {
        return false;
      }
      this.$emit('close', e);
    }
  }
};