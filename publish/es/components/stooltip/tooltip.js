import { Popper, Drop, Reference } from '@wish/wt-vue/es/components/popper';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('popper', _vm._b({ ref: "popper", class: _vm.prefix + "-rel", attrs: { "tag": _vm.tag, "popper-disabled": _vm.disabled, "trigger": _vm.trigger, "show-arrow": _vm.showArrow, "visible": !_vm.disabled && _vm.visible, "open-delay": _vm.openDelay }, on: { "update:visible": _vm.handleVisibleChange, "clickoutside": _vm.clickoutside } }, 'popper', _vm.$attrs, false), [_c('reference', [_vm._t("default")], 2), _vm._v(" "), _c('drop', { class: [_vm.prefix, (_obj = {}, _obj[_vm.prefix + "-" + _vm.size] = _vm.size, _obj[_vm.prefix + "-" + _vm.theme] = _vm.theme, _obj), _vm.popperClass] }, [_vm._t("content", function () {
    return [_vm._v(_vm._s(_vm.content))];
  })], 2)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtStooltip',
  components: {
    Popper: Popper,
    Drop: Drop,
    Reference: Reference
  },
  inheritAttrs: false,
  model: {
    prop: 'visible'
  },
  props: {
    content: [String, Number],
    visible: Boolean,
    size: String,
    showArrow: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    popperClass: [String, Object, Array],
    disabled: Boolean,
    theme: {
      type: String
    },
    openDelay: {
      type: Number,
      default: 300
    },
    tag: {
      type: [String, Object],
      default: 'span'
    }
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
      return this.config.getPrefixCls('stooltip');
    }
  },
  methods: {
    clickoutside: function clickoutside(e) {
      this.$emit('clickoutside', e);
    },
    handleVisibleChange: function handleVisibleChange(v) {
      this.$emit('input', v);
    },
    updatePopper: function updatePopper() {
      var popper = this.$refs.popper;

      if (this.visible && popper) {
        popper.updatePopper();
      }
    }
  }
};