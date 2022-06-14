import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { class: _vm.prefix }, [_c(_vm.tag, _vm._b({ tag: "component", class: _vm.breadcrumbPrefix + "-inner" }, 'component', _vm.$attrs, false), [_vm._t("default")], 2), _vm._v(" "), _c('wt-icon', { class: [_vm.breadcrumbPrefix + "-separator"], attrs: { "name": "chevron-right", "color": "#0E161C", "width": 12, "height": 12 } })], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtBreadcrumbItem',
  inheritAttrs: false,
  props: {
    // 动态组件名
    tag: {
      type: [String, Object],
      default: 'span'
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('breadcrumb-item');
    },
    breadcrumbPrefix: function breadcrumbPrefix() {
      return this.config.getPrefixCls('breadcrumb');
    }
  },
  inject: {
    breadcrumb: {
      from: 'breadcrumb'
    },
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
     * 跳转链接
     */
    toLink: function toLink(event) {
      console.log(event);
    }
  }
};