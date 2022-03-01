import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { triggerKeyUp, triggerKeyDown, waitImmediate } from '@test/util';

function triggerKey(el, keyCode) {
  triggerKeyDown(el, keyCode);
  triggerKeyUp(el, keyCode);
}
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-select', { ref: "select", attrs: { "multiple": "", "filterable": true }, model: { value: _vm.value, callback: function callback($v) {
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
      value: ['李白']
    };
  },

  methods: {
    doTest: function doTest() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var tags, input, last;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return waitImmediate();

              case 2:
                tags = _this.$el.querySelectorAll('.wt-select-choice');

                expect(tags.length).to.be.eql(1);
                input = _this.$el.querySelector('.wt-select-search-field');
                // focus 在最后一个 tag 上

                triggerKey(input, 8); // delete
                _context.next = 8;
                return waitImmediate();

              case 8:
                last = tags[0];

                expect(!!last.querySelector('.focus')).to.be.true();
                // 删除最后一个 tag 的值
                triggerKey(input, 8); // delete
                _context.next = 13;
                return waitImmediate();

              case 13:
                expect(_this.value).to.be.eql([], 'should remove last tag');

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};