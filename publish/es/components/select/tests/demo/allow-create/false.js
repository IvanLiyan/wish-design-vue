import _regeneratorRuntime from 'babel-runtime/regenerator';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import Select from '../../../select';
import { setInputValue, triggerEvent, waitImmediate } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', { ref: "select", attrs: { "filterable": true }, model: { value: _vm.value, callback: function callback($v) {
        _vm.value = $v;
      }, expression: "value" } }, _vm._l(_vm.options, function (item) {
    return _c('wt-option', { key: item.value, attrs: { "label": item.label, "value": item.value, "disabled": item.disabled } });
  }), 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'SelectAllowCreate',
  components: {
    MtdSelect: Select
  },
  data: function data() {
    var options = [{
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
    }];
    return {
      options: options,
      value: ''
    };
  },

  methods: {
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var query, select, input, options, texts;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = '李明';
                select = _this.$refs.select;

                triggerEvent(_this.$el, 'click');
                _context.next = 5;
                return waitImmediate();

              case 5:
                expect(select.opened).to.be.true();
                input = _this.$el.querySelector('input');

                setInputValue(input, query);
                _context.next = 10;
                return waitImmediate();

              case 10:
                options = [].concat(_toConsumableArray(document.body.querySelectorAll('.wt-select-dropdown .wt-dropdown-menu-item'))).filter(function (option) {
                  return option.style.display !== 'none';
                });
                texts = options.map(function (option) {
                  return option.innerText;
                });

                expect(texts).to.not.include(query);
                expect(select.isNoMatched).to.be.true();
                done();

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};