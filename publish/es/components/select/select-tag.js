import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
import WtTag from '@wish/wt-vue/es/components/tag';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('li', { class: _vm.prefix + "-choice" }, [_vm._t("tag", function () {
    return [_c('wt-tag', { class: { focus: _vm.option.hitState }, attrs: { "size": _vm.size, "clearable": _vm.clearable, "disabled": _vm.disabled, "round": "" }, on: { "close": _vm.handleClose } }, [_vm._t("default")], 2)];
  }, { "option": _vm.option, "size": _vm.size, "clearable": _vm.clearable, "disabled": _vm.disabled, "onClose": _vm.handleClose })], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtSelectChoice',
  components: {
    WtTag: WtTag
  },
  props: {
    size: String,
    option: {
      type: Object,
      required: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: Boolean
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
      return this.config.getPrefixCls('select');
    }
  },
  methods: {
    handleClose: function handleClose() {
      this.$emit('close', this.option);
    }
  }
};