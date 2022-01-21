import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { triggerClick, waitImmediate } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-date-picker', { attrs: { "type": "week", "open": _vm.open, "start-date": _vm.startDate, "placeholder": "选择时间", "format": "yyyy年WW周" }, on: { "update:open": function updateOpen($event) {
        _vm.open = $event;
      } }, model: { value: _vm.value, callback: function callback($v) {
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
      open: false,
      startDate: new Date(2019, 11, 30)
    };
  },

  methods: {
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var pickerEl, cellEl;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.open = true;
                _context.next = 3;
                return waitImmediate();

              case 3:
                pickerEl = document.querySelector('.wt-picker-panel-body-wrapper');

                expect(pickerEl).to.be.not.undefined();

                // 2019-12-26
                cellEl = pickerEl.querySelector('.wt-date-picker-cells-cell:nth-child(4)');

                expect(cellEl).to.be.not.undefined();
                triggerClick(cellEl, true, true);
                _context.next = 10;
                return waitImmediate();

              case 10:
                expect(_this.value.getTime()).to.be.eql(1574697600000);
                done();

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};