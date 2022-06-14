import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-vertical"] = _vm.isVertical, _obj) }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtLayout',

  componentName: 'wt-Layout',

  props: {
    direction: String
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
      return this.config.getPrefixCls('layout');
    },
    isVertical: function isVertical() {
      if (this.direction === 'vertical') {
        return true;
      } else if (this.direction === 'horizontal') {
        return false;
      }
      return this.$slots && this.$slots.default ? this.$slots.default.some(function (vnode) {
        var tag = vnode.componentOptions && vnode.componentOptions.tag;
        return tag === 'wt-header' || tag === 'wt-footer';
      }) : false;
    }
  }
};