import MtdSelect from '@wish/wt-vue/es/components/select';
import MtdOption from '@wish/wt-vue/es/components/option';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', { attrs: { "formatter": _vm.formatter, "filterable": "", "value-key": "id" }, model: { value: _vm.value, callback: function callback($v) {
        _vm.value = $v;
      }, expression: "value" } }, _vm._l(_vm.options, function (item) {
    return _c('wt-option', { key: item.id, attrs: { "value": item, "label": item.name } });
  }), 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  components: {
    MtdSelect: MtdSelect,
    MtdOption: MtdOption
  },
  data: function data() {
    return {
      value: {
        id: '1',
        name: '李白'
      },
      options: [{
        id: '1',
        name: '李白'
      }, {
        id: '2',
        name: '李贺'
      }, {
        id: '3',
        name: '杜甫'
      }, {
        id: '4',
        name: '白居易'
      }, {
        id: '5',
        name: '屈原'
      }]
    };
  },

  methods: {
    formatter: function formatter(option) {
      return 'name: ' + option.value.name;
    }
  }
};