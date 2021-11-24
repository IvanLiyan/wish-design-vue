import _Symbol from 'babel-runtime/core-js/symbol';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.wrapperCls }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtRadioGroup',
  props: {
    value: [String, Number, Boolean, Function, Object, Array, _Symbol],
    disabled: Boolean,
    size: String,
    name: String,
    // 排列方式
    arrange: {
      type: String,
      default: 'horizontal',
      range: ['horizontal', 'vertical']
    }
  },
  provide: function provide() {
    return {
      radioGroup: this
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
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('radio-group');
    },
    wrapperCls: function wrapperCls() {
      var prefix = this.prefix;

      return [prefix, prefix + '-' + this.arrange];
    }
  },
  created: function created() {
    this.$on('radioChange', this.handleChange);
  },

  methods: {
    handleChange: function handleChange(radioValue) {
      if (this.value !== radioValue) {
        this.$emit('input', radioValue);
        this.$emit('change', radioValue);
      }
    }
  }
};