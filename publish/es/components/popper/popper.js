import _defineProperty from 'babel-runtime/helpers/defineProperty';
import { key } from './provide';
import Popper from '@wish/wt-vue/es/utils/popper';
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.tag, _vm._g(_vm._b({ tag: "div" }, 'div', _vm.$attrs, false), _vm.$listeners), [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WdPopper',
  mixins: [Popper],
  inheritAttrs: false,
  props: {
    tag: {
      type: [String, Object],
      default: 'div'
    }
  },
  provide: function provide() {
    return _defineProperty({}, key, this);
  },

  methods: {
    registerReference: function registerReference(reference) {
      this.referenceRef = reference;
      this.reference = reference.$el;
    },
    registerDrop: function registerDrop(drop) {
      this.dropRef = drop;
      this.drop = drop.$el;
    }
  }
};