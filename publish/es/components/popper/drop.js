import { key } from './provide';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.transition }, on: { "after-leave": _vm.handleAfterLeave } }, [_c(_vm.tag, _vm._g(_vm._b({ directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], ref: "drop", tag: "div", class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-show-arrow"] = _vm.showArrow, _obj) }, 'div', _vm.$attrs, false), _vm.$listeners), [_vm.showArrow ? _c('div', { class: _vm.prefix + "-arrow", attrs: { "x-arrow": "" } }) : _vm._e(), _vm._v(" "), _vm.useShow ? [_vm._t("default")] : [_vm.isMounted ? _vm._t("default") : _vm._e()]], 2)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtPopperDrop',
  inheritAttrs: false,
  inject: {
    popper: {
      from: key
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  props: {
    useShow: Boolean,
    tag: {
      type: [String, Object],
      default: 'div'
    },
    transition: {
      type: String,
      default: 'fade-in'
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      isMounted: this.popper.visible
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('popper');
    },
    showArrow: function showArrow() {
      return this.popper.showArrow;
    },
    visible: function visible() {
      return this.popper.visible;
    }
  },
  watch: {
    visible: function visible(n) {
      if (n) {
        this.isMounted = true;
      }
    }
  },
  mounted: function mounted() {
    this.popper.registerDrop(this);
  },
  activated: function activated() {
    // tofix: ones.sankuai.com/ones/product/4348/workItem/defect/detail/7142006
    // 在嵌套 drop 的组件中，存在内部 drop 组件没有被挂载到实际的 parent 节点下的情况
    var parentEl = this.$parent.$el;
    var children = parentEl.children;
    var found = false;
    for (var i = children.length; i > -1; i--) {
      if (this.$el === children[i]) {
        found = true;
        break;
      }
    }
    if (!found) {
      parentEl.append(this.$el);
    }
  },

  methods: {
    handleAfterLeave: function handleAfterLeave() {
      if (this.destroyOnClose) {
        this.isMounted = false;
      }
    }
  }
};