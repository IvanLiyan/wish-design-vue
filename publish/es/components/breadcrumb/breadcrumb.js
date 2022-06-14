import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.prefix + "-wrapper" }, [_vm.showBackIcon ? _c('div', { class: _vm.prefix + "-title" }, [_c('wt-icon', { class: _vm.prefix + "-title-icon", attrs: { "name": "arrow-left", "width": 24, "height": 24, "color": "#7790A3" }, on: { "click": _vm.goBack } }), _vm._v(" "), _c('span', { class: _vm.prefix + "-title-text" }, [_vm._v(_vm._s(_vm.slotTitle))])], 1) : !_vm.showBackIcon && _vm.showTitle ? _c('div', { class: _vm.prefix + "-title" }, [_c('span', { class: _vm.prefix + "-title-text" }, [_vm._v(_vm._s(_vm.slotTitle))])]) : _vm._e(), _vm._v(" "), _c('div', { class: _vm.prefix }, [_vm._t("default")], 2)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtBreadcrumb',
  props: {
    // 显示标题
    showTitle: {
      type: Boolean,
      default: false
    },
    // 显示返回按钮
    showBackIcon: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      // 获取slot的dom
      slotVNode: this.$slots.default.slice(-1)
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('breadcrumb');
    },

    // 获取标题
    slotTitle: function slotTitle() {
      return this.slotVNode[0].componentOptions.children[0].text;
    }
  },
  provide: function provide() {
    return {
      breadcrumb: this
    };
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconCls: getIconCls
      }
    }
  },
  methods: {
    /**
     * 返回上一页
     */
    goBack: function goBack() {
      window.history.go(-1);
    }
  }
};