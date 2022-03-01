import { Form, FormItem, Input } from '@wish/wt-vue/es/index';
import { findVM } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('Form', { attrs: { "disabled": "" } }, [_c('Input', { ref: "input1" }), _vm._v(" "), _c('Input', { ref: "input2", attrs: { "disabled": false } }), _vm._v(" "), _c('FormItem', [_c('Input', { ref: "input3" })], 1)], 1), _vm._v(" "), _c('Form', [_c('FormItem', [_c('Input', { ref: "input4" }), _vm._v(" "), _c('Input', { ref: "input5", attrs: { "disabled": "" } })], 1)], 1)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  components: {
    Form: Form,
    FormItem: FormItem,
    Input: Input
  },
  methods: {
    assertDisabled: function assertDisabled(vm, disabled, message) {
      var input = findVM(vm, { name: 'Input' });
      expect(input.disabled).to.be.eql(disabled, message);
      var inputEl = input.$el.querySelector('input');
      expect(inputEl.disabled).to.be.eql(disabled, 'input element should be ' + disabled);
    },
    doTest: function doTest(done) {
      var _$refs = this.$refs,
          input1 = _$refs.input1,
          input2 = _$refs.input2,
          input3 = _$refs.input3,
          input4 = _$refs.input4,
          input5 = _$refs.input5;

      this.assertDisabled(input1, true, 'input1 should inherit Form.disabled');
      this.assertDisabled(input2, false, 'input2 should use input.disabled');
      this.assertDisabled(input3, true, 'input3 should inherit Form.disabled');
      this.assertDisabled(input4, false, 'input4');
      this.assertDisabled(input5, true, 'input5');
      done();
    }
  }
};