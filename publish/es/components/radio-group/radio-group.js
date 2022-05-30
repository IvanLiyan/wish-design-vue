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
    // 单选框组的值
    value: [String, Number, Boolean, Function, Object, Array, _Symbol],
    // 是否禁用
    disabled: Boolean,
    // RadioGroup 下所有 input[type='radio'] 的 name 属性
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
    /**
     * 监听radio的值变化
     */
    this.$on('radioChange', this.handleChange);
  },

  methods: {
    /**
     * 值改变
     */
    handleChange: function handleChange(radioValue) {
      if (this.value !== radioValue) {
        // 顺序不能改变，必须先input后change, 若先change，formItem会去校验，此时value值还没改变,会产生校验错误
        this.$emit('input', radioValue);
        this.$emit('change', radioValue);
      }
    }
  }
};