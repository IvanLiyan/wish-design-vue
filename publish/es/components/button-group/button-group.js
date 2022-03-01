import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.prefix }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtButtonGroup',
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
      return this.config.getPrefixCls('btn-group');
    }
  },

  created: function created() {
    this.setType();
  },
  beforeUpdate: function beforeUpdate() {
    this.setType();
  },
  methods: {
    /**
     * 按钮组，将所有按钮设置为类型“third”的按钮展示
     */
    setType: function setType() {
      var buttons = this.$slots.default;
      if (buttons && buttons.length > 0) {
        buttons.forEach(function (button) {
          return button.componentOptions.propsData.type = 'third';
        });
        this.$slots.default = buttons;
      }
    }
  }
};