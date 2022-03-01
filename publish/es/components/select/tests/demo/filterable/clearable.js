import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { setInputValue,
// triggerEvent,
triggerClick, waitImmediate } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', { ref: "select", staticStyle: { "width": "200px" }, attrs: { "filterable": "", "clearable": "" }, model: { value: _vm.value, callback: function callback($v) {
        _vm.value = $v;
      }, expression: "value" } }, _vm._l(_vm.options, function (item) {
    return _c('wt-option', { key: item.value, attrs: { "label": item.label, "value": item.value, "disabled": item.disabled } });
  }), 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  data: function data() {
    return {
      options: [{
        value: '李白',
        label: '李白'
      }, {
        value: '李贺',
        label: '李贺'
      }, {
        value: '杜甫',
        label: '杜甫',
        disabled: true
      }, {
        value: '白居易',
        label: '白居易'
      }, {
        value: '屈原',
        label: '屈原'
      }],
      value: ''
    };
  },

  methods: {
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var input, select, options, filteredOptions, clearIcon, filteredOptions2;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.$refs.select.focus();
                _context.next = 3;
                return waitImmediate();

              case 3:
                input = _this.$el.querySelector('input');

                setInputValue(input, '李白');
                _context.next = 7;
                return waitImmediate();

              case 7:
                select = _this.$refs.select.$refs.wrappedInstance;

                expect(select.query).to.be.equal('李白');
                options = select.options;
                filteredOptions = options.filter(function (opt) {
                  return opt.visible;
                });

                expect(filteredOptions.length).to.be.equal(1);

                triggerClick(filteredOptions[0].$el);
                _context.next = 15;
                return waitImmediate();

              case 15:
                expect(_this.value).to.be.equal('李白');

                select.$refs.reference.hovering = true;
                _context.next = 19;
                return waitImmediate();

              case 19:
                clearIcon = _this.$el.querySelector('.wt-input-suffix-inner .wt-input-clear');

                expect(clearIcon).to.be.ok();
                triggerClick(clearIcon);
                _context.next = 24;
                return waitImmediate();

              case 24:

                _this.$refs.select.focus();
                _context.next = 27;
                return waitImmediate();

              case 27:

                expect(_this.value).to.be.equal('');
                filteredOptions2 = options.filter(function (opt) {
                  return opt.visible;
                });

                expect(filteredOptions2.length).to.be.equal(_this.options.length);

                done();

              case 31:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};