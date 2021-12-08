import { Popper, Drop, Reference } from '@wish/wt-vue/es/components/popper';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('Popper', _vm._b({ ref: "popper", class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-expended"] = _vm.visible, _obj), attrs: { "visible": _vm.visible, "trigger": _vm.trigger, "placement": _vm.placement, "show-arrow": _vm.showArrow, "popper-disabled": _vm.disabled }, on: { "update:visible": _vm.updateVisible, "clickoutside": _vm.clickoutside } }, 'Popper', _vm.$attrs, false), [_c('Reference', { ref: "reference" }, [_vm._t("default")], 2), _vm._v(" "), _c('Drop', { class: [_vm.popperClass, _vm.prefix + "-popper"], style: { 'min-width': _vm.width }, attrs: { "use-show": _vm.useShow } }, [_vm._t("dropdown")], 2)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtDropdown',
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
    visible: Boolean,
    trigger: {
      type: String,
      default: 'click'
    },
    placement: String,
    popperClass: [String, Object, Array],
    showArrow: Boolean,
    disabled: Boolean,
    visibleOnMenuItemClick: {
      type: Boolean,
      default: false
    },

    shouldComputedWidth: {
      type: Boolean,
      default: true
    },
    useShow: Boolean // 暂时不确定属性名，谨慎使用
  },
  provide: function provide() {
    return {
      dropdown: this
    };
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  data: function data() {
    return {
      width: 'auto'
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('dropdown');
    }
  },
  watch: {
    visible: function visible(v) {
      if (v && this.shouldComputedWidth) {
        var _$refs$reference$$el$ = this.$refs.reference.$el.getBoundingClientRect(),
            width = _$refs$reference$$el$.width;

        this.width = width + 'px';
      }
    }
  },
  mounted: function mounted() {
    this.$on('itemClick', this.handleMenuItemClick);
  },

  methods: {
    clickoutside: function clickoutside(e) {
      this.$emit('clickoutside', e);
    },
    updateVisible: function updateVisible(v) {
      this.$emit('input', v);
      this.$emit('change', v);
    },
    handleMenuItemClick: function handleMenuItemClick() {
      if (!this.visibleOnMenuItemClick) {
        this.$emit('input', false);
        this.$emit('change', false);
      }
    },
    updatePopper: function updatePopper() {
      var popper = this.$refs.popper;

      if (this.visible && popper) {
        popper.updatePopper();
      }
    }
  }
};