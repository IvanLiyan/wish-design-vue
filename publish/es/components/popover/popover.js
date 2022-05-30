import { Popper, Drop, Reference } from '@wish/wt-vue/es/components/popper';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('popper', _vm._b({ ref: "popper", class: _vm.prefix + "-rel", attrs: { "tag": _vm.tag, "popper-disabled": _vm.disabled, "placement": _vm.placement, "trigger": _vm.trigger, "visible": !_vm.disabled && _vm.visible, "show-arrow": _vm.showArrow }, on: { "update:visible": _vm.handleVisibleChange, "clickoutside": _vm.clickoutside } }, 'popper', _vm.$attrs, false), [_c('reference', [_vm._t("default")], 2), _vm._v(" "), _c('drop', { class: [_vm.prefix, (_obj = {}, _obj[_vm.prefix + "-" + _vm.size] = _vm.size, _obj), _vm.popperClass], style: {
      width: _vm.w
    }, attrs: { "transition": _vm.transition } }, [_vm.$slots.title || _vm.title ? _c('div', { class: _vm.prefix + "-title" }, [_vm._t("title", function () {
    return [_vm._v(_vm._s(_vm.title))];
  })], 2) : _vm._e(), _vm._v(" "), _vm._t("content", function () {
    return [_vm._v(_vm._s(_vm.content))];
  })], 2)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'Popover',
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
    title: String,
    content: String,
    visible: Boolean,
    size: String,
    showArrow: {
      type: Boolean,
      default: true
    },
    trigger: {
      type: String,
      default: 'click'
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    transition: String,
    popperClass: [String, Object, Array],
    disabled: Boolean,
    tag: {
      type: [String, Object],
      default: 'span'
    },
    width: [String, Number]
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
      return this.config.getPrefixCls('popover');
    },
    w: function w() {
      return (/^\d+$/.test(this.width) ? this.width + 'px' : this.width
      );
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