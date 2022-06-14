import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.wrapperCls }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtCheckboxGroup',
  props: {
    // 当前选中的所有checkbox的值，支持 v-model
    value: {
      type: Array
    },
    // 多选框排列方式
    arrange: {
      type: String,
      default: 'horizontal',
      range: ['horizontal', 'vertical']
    },
    // 禁用多选框组
    disabled: Boolean,
    // form输入控件的name
    name: String
  },
  provide: function provide() {
    return {
      checkboxGroup: this
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
      return this.config.getPrefixCls('checkbox-group');
    },
    wrapperCls: function wrapperCls() {
      var prefix = this.prefix;

      return [prefix, prefix + '-' + this.arrange];
    }
  },
  created: function created() {
    this.$on('checkboxChange', this.handleChange);
  },

  methods: {
    /**
     * 改变值
     */
    handleChange: function handleChange(checked, value) {
      var groupValue = this.value || [];
      var index = groupValue.indexOf(value);
      var nextValue = [].concat(_toConsumableArray(groupValue));
      if (checked) {
        nextValue.push(value);
      } else if (index !== -1) {
        nextValue.splice(index, 1);
      }
      this.$emit('input', nextValue);
      this.$emit('change', nextValue);
    }
  }
};