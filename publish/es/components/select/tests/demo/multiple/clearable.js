import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { triggerClick, waitImmediate } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', { ref: "select", attrs: { "multiple": "", "collapse-tags": "", "clearable": "" }, model: { value: _vm.value, callback: function callback($v) {
        _vm.value = $v;
      }, expression: "value" } }, _vm._l(_vm.options, function (item) {
    return _c('wt-option', { key: item.value, attrs: { "label": item.label, "value": item.value, "disabled": item.disabled } });
  }), 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'MultipleNullSelect',
  data: function data() {
    return {
      value: null,
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
      }]
    };
  },

  methods: {
    doTest: function doTest() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var select, options;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.$refs.select.focus();
                _context.next = 3;
                return waitImmediate();

              case 3:
                select = _this.$refs.select.$refs.wrappedInstance;
                options = select.options;


                triggerClick(options[0].$el);
                _context.next = 8;
                return waitImmediate();

              case 8:
                expect(_this.value).to.be.eql([_this.options[0].value]);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};