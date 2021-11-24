import CheckboxGroup, { withCheckboxGroup } from '../../index.js';

var TestCheckbox = withCheckboxGroup('checkbox', {
  name: 'DumbCheckbox',
  props: {
    value: [String, Number],
    disabled: Boolean,
    checked: Boolean,
    name: String
  },
  methods: {
    handleClick: function handleClick(v) {
      this.$emit('input', !this.checked);
    }
  },
  render: function render(h) {
    return h('div', {
      on: {
        click: this.handleClick
      }
    });
  }
});

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('checkbox-group', _vm._b({}, 'checkbox-group', _vm.$attrs, false), [_c('checkbox', { attrs: { "value": "1" } }), _vm._v(" "), _c('checkbox', { attrs: { "value": "2", "name": "other" } }), _vm._v(" "), _c('checkbox', { attrs: { "value": "3", "disabled": "" } }), _vm._v(" "), _c('checkbox', { attrs: { "value": "4", "checked": "" } })], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'SlotTest',
  components: {
    checkbox: TestCheckbox,
    CheckboxGroup: CheckboxGroup
  }
};