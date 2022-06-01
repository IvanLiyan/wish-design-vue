import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import MtdSelect from '@wish/wt-vue/es/components/select';
import MtdOption from '@wish/wt-vue/es/components/option';
import { triggerClick, waitImmediate, findVM } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', { ref: "select", attrs: { "multiple": _vm.multiple }, model: { value: _vm.value, callback: function callback($v) {
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
      multiple: true,
      options: [{
        label: '是',
        value: true
      }, {
        label: '否',
        value: false
      }]
    };
  },

  methods: {
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var select, options, tags;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.$refs.select.focus();
                _context.next = 3;
                return waitImmediate();

              case 3:
                select = findVM(_this.$refs.select, {
                  name: 'Select'
                });
                options = select.options;

                triggerClick(options[0].$el);
                _context.next = 8;
                return waitImmediate();

              case 8:
                expect(_this.value).to.be.eql([_this.options[0].value]);
                tags = select.$el.querySelector('.wt-select-tags');

                expect(tags.innerText).to.be.eql(_this.options[0].label);

                _this.value = undefined;
                _this.$refs.select.focus();
                _context.next = 15;
                return waitImmediate();

              case 15:
                triggerClick(options[1].$el);
                _context.next = 18;
                return waitImmediate();

              case 18:
                expect(_this.value).to.be.eql([_this.options[1].value]);
                expect(tags.innerText).to.be.eql(_this.options[1].label);
                done();

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};