import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.tag, { tag: "div", class: [_vm.prefix, _vm.justify !== 'start' ? _vm.prefix + "-justify-" + _vm.justify : '', _vm.align !== 'top' ? _vm.prefix + "-align-" + _vm.align : '', (_obj = {}, _obj[_vm.prefix + "-flex"] = _vm.type === 'flex', _obj)] }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtRow',

  props: {
    // 自定义元素标签
    tag: {
      type: String,
      default: 'div'
    },
    // 栅格间隔
    gutter: Number,
    // 布局模式
    type: String,
    // flex布局下的水平排列方式
    justify: {
      type: String,
      default: 'start'
    },
    // flex 布局下的垂直排列方式
    align: {
      type: String,
      default: 'top'
    }
  },
  provide: function provide() {
    return { row: this };
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
      return this.config.getPrefixCls('row');
    }
  }
};