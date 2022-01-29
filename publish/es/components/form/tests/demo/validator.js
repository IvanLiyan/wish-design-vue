import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { Form, FormItem, Input } from '@wish/wt-vue/es/index';
import { waitImmediate, wait } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('Form', { ref: "form", attrs: { "model": _vm.data } }, [_c('FormItem', { attrs: { "prop": "input1", "required": "" } }, [_c('Input', { attrs: { "value": _vm.data.input1 } })], 1), _vm._v(" "), _c('FormItem', { attrs: { "prop": "input2", "required": "" } }, [_c('Input', { attrs: { "value": _vm.data.input2 } })], 1)], 1)], 1);
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
  data: function data() {
    return {
      data: {
        input1: '',
        input2: ''
      }
    };
  },

  methods: {
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var form;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                form = _this.$refs.form;
                _context.prev = 1;
                _context.next = 4;
                return form.validator(function (valid, errors) {
                  expect(valid).to.be.eql(false, 'not set any value, form must not pass the verification');
                });

              case 4:
                _context.next = 8;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](1);

              case 8:

                _this.data.input1 = 'xxxx';
                _context.next = 11;
                return waitImmediate();

              case 11:

                form.validateFields('input1', function (valid, errors) {
                  expect(valid).to.be.eql(true, 'only validate input1, it must pass the verification');
                });
                _context.next = 14;
                return wait(200);

              case 14:

                form.validateFields(['input1', 'input2'], function (valid, errors) {
                  expect(valid).to.be.eql(false, 'validate input1, input2, it must not pass the verification');
                });
                _context.next = 17;
                return wait(200);

              case 17:

                _this.data.input2 = 'xxx';
                _context.next = 20;
                return waitImmediate();

              case 20:
                form.validateFields(['input1', 'input2'], function (valid, errors) {
                  expect(valid).to.be.eql(true, 'must not pass the verification');
                });
                _context.next = 23;
                return wait(200);

              case 23:

                done();

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[1, 6]]);
      }))();
    }
  }
};