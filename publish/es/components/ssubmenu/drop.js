import { Popper, Drop } from '@wish/wt-vue/es/components/popper';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('Popper', { ref: "popper", attrs: { "popper-disabled": _vm.disabled, "placement": _vm.placement, "visible": _vm.v, "show-arrow": _vm.level === 0 } }, [_c('Drop', { class: _vm.dropClassName, attrs: { "tag": "ul", "use-show": !_vm.lazy }, on: { "mouseenter": _vm.handleMouseenter, "mouseleave": _vm.handleMouseleave } }, [_vm._t("default")], 2)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'DropdownMenu',
  components: {
    Popper: Popper,
    Drop: Drop
  },
  inheritAttrs: false,
  props: {
    placement: String,
    level: Number,
    disabled: Boolean,
    visible: Boolean,
    lazy: Boolean,
    popperClass: String
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
      v: false
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('smenu');
    },
    dropClassName: function dropClassName() {
      var prefix = this.prefix;

      var submenu = this.config.getPrefixCls('ssubmenu');
      return [prefix, prefix + '-light', prefix + '-vertical', submenu + '-dropdown', this.popperClass];
    }
  },
  watch: {
    visible: function visible() {
      this.v = this.visible;
    }
  },
  mounted: function mounted() {
    this.$refs.popper.registerReference(this.$parent);
    this.v = this.visible;
    // this.$refs.popper.init();
  },

  methods: {
    handleMouseenter: function handleMouseenter(e) {
      this.$emit('mouseenter', e);
    },
    handleMouseleave: function handleMouseleave(e) {
      this.$emit('mouseleave', e);
    }
  }
};