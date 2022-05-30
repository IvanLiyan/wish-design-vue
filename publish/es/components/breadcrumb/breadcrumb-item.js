import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { class: _vm.prefix }, [_c(_vm.tag, _vm._b({ tag: "component", class: _vm.breadcrumbPrefix + "-inner" }, 'component', _vm.$attrs, false), [_vm._t("default")], 2), _vm._v(" "), _vm.separatorClass || !_vm.separator ? _c('wt-icon', { class: [_vm.breadcrumbPrefix + "-separator"], attrs: { "name": "chevron-right", "color": "#0E161C", "width": 12, "height": 12 } }) : _c('span', { class: _vm.breadcrumbPrefix + "-separator" }, [_vm._v(_vm._s(_vm.separator))])], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtBreadcrumbItem',
  inheritAttrs: false,
  props: {
    tag: {
      type: [String, Object],
      default: 'span'
    }
  },
  data: function data() {
    return {
      slotText: this.$slots.default[0].text
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('breadcrumb-item');
    },
    breadcrumbPrefix: function breadcrumbPrefix() {
      return this.config.getPrefixCls('breadcrumb');
    },
    getIcon: function getIcon() {
      return this.config.getIconCls;
    },
    separator: function separator() {
      return this.breadcrumb.separator;
    },
    separatorClass: function separatorClass() {
      return this.breadcrumb.separatorClass;
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
    toLink: function toLink(event) {
      console.log(event);
    }
  }
};