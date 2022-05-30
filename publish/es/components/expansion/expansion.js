import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-" + _vm.type] = _vm.type, _obj) }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtExpansion',
  props: {
    value: [String, Number, Boolean, Object, Array],
    type: String
  },
  provide: function provide() {
    return {
      expansion: this
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
      return this.config.getPrefixCls('expansion');
    }
  },
  created: function created() {
    this.$on('itemClick', this.handleClick);
  },

  methods: {
    handleClick: function handleClick(active, item) {
      var isArray = Array.isArray(this.value);
      var nextValue = void 0;
      if (isArray) {
        nextValue = active ? [].concat(_toConsumableArray(this.value), [item.value]) : this.value.filter(function (v) {
          return v !== item.value;
        });
      } else {
        nextValue = active ? item.value : '';
      }
      this.$emit('input', nextValue);
      this.$emit('change', nextValue);
    }
  }
};