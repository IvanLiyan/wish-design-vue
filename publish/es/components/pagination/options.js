import WtSelect from '@wish/wt-vue/es/components/select';
import WtOption from '@wish/wt-vue/es/components/option';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', _vm._b({ class: _vm.prefix + "-options", attrs: { "value": _vm.pageSize, "size": _vm.size, "placeholder": "请选择" }, on: { "input": _vm.handleChange } }, 'wt-select', _vm.selectProps, false), _vm._l(_vm.pageSizeOptions, function (item) {
    return _c('wt-option', { key: item, attrs: { "label": item + '条/页', "value": item } });
  }), 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'PaginationOptions',

  components: {
    WtSelect: WtSelect,
    WtOption: WtOption
  },
  props: {
    pageSizeOptions: Array,
    pageSize: Number,
    size: {
      type: String
    },
    selectProps: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
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
      return this.config.getPrefixCls('pagination');
    }
  },
  methods: {
    handleChange: function handleChange(val) {
      this.$emit('change', val);
    }
  }
};