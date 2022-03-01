import _regeneratorRuntime from 'babel-runtime/regenerator';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import Select from '../../../select';
import { setInputValue, triggerEvent, waitImmediate, triggerClick } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', { ref: "select", attrs: { "filterable": true, "allow-create": "" }, on: { "change": _vm.handleChange }, model: { value: _vm.value, callback: function callback($v) {
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
      value: '',
      handleChange: function handleChange() {}
    };
  },

  methods: {
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var query, select, input, options, texts, matchOption;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.handleChange = sinon.spy();
                _context.next = 3;
                return waitImmediate();

              case 3:
                query = '李明';
                select = _this.$refs.select;
                // 打开面板

                triggerEvent(_this.$el, 'click');
                _context.next = 8;
                return waitImmediate();

              case 8:
                expect(select.opened).to.be.true();
                input = _this.$el.querySelector('input');
                // 搜索

                setInputValue(input, query);
                _context.next = 13;
                return waitImmediate();

              case 13:
                options = [].concat(_toConsumableArray(document.body.querySelectorAll('.wt-select-dropdown .wt-dropdown-menu-item'))).filter(function (option) {
                  return option.style.display !== 'none';
                });
                texts = options.map(function (option) {
                  return option.innerText;
                });

                expect(texts).to.include(query);
                expect(select.isNoMatched).to.be.false();

                matchOption = options.find(function (option) {
                  return option.innerText === query;
                });

                triggerClick(matchOption);
                _context.next = 21;
                return waitImmediate();

              case 21:
                expect(_this.value).to.be.eql(query);
                expect(_this.handleChange.calledOnce).to.be.true();
                done();

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};