import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { waitImmediate } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-date-picker', { attrs: { "type": "daterange", "placeholder": "选择时间" }, on: { "change": _vm.handleInput }, model: { value: _vm.value, callback: function callback($v) {
        _vm.value = $v;
      }, expression: "value" } });
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  data: function data() {
    return {
      value: undefined,
      handleInput: function handleInput() {}
    };
  },

  methods: {
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.handleInput = sinon.spy();
                _context.next = 3;
                return waitImmediate();

              case 3:
                _this.value = [];
                _context.next = 6;
                return waitImmediate();

              case 6:
                _this.handleInput.should.have.been.not.called('set []');
                _this.value = [new Date(), new Date()];
                _context.next = 10;
                return waitImmediate();

              case 10:
                _this.handleInput.should.have.been.not.called('set Date[]');
                _this.value = null;
                _context.next = 14;
                return waitImmediate();

              case 14:
                _this.handleInput.should.have.been.not.called('set null');
                done();

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};