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
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    arrange: {
      type: String,
      default: 'horizontal',
      range: ['horizontal', 'vertical']
    },
    disabled: Boolean,
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
    handleChange: function handleChange(checked, value) {
      var index = this.value.indexOf(value);
      var nextValue = [].concat(_toConsumableArray(this.value));
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