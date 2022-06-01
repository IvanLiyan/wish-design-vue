import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import MtdSelect from '@wish/wt-vue/es/components/select';
import MtdOption from '@wish/wt-vue/es/components/option';
import { triggerClick, waitImmediate } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', { ref: "select", model: { value: _vm.value, callback: function callback($v) {
        _vm.value = $v;
      }, expression: "value" } }, _vm._l(_vm.options, function (item, index) {
    return _c('wt-option', { key: index, attrs: { "value": item.value, "label": item.label } });
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
      value: null,
      options: [{
        label: 'true',
        value: true
      }, {
        label: 'false',
        value: false
      }]
    };
  },

  methods: {
    doTest: function doTest(done) {
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
                expect(_this.value).to.be.eql(_this.options[0].value);
                expect(select.showValue).to.be.eql(_this.options[0].label);

                _this.$refs.select.focus();
                _context.next = 13;
                return waitImmediate();

              case 13:
                triggerClick(options[1].$el);
                _context.next = 16;
                return waitImmediate();

              case 16:
                expect(_this.value).to.be.eql(_this.options[1].value);
                expect(select.showValue).to.be.eql(_this.options[1].label);

                done();

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};