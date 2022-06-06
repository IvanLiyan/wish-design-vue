import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { triggerClick, waitImmediate } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-table', { attrs: { "data": _vm.data, "sort-order": _vm.sortOrder }, on: { "sort-change": _vm.onSortChange, "update:sortOrder": function updateSortOrder($event) {
        _vm.sortOrder = $event;
      }, "update:sort-order": function updateSortOrder($event) {
        _vm.sortOrder = $event;
      } } }, [_c('wt-table-column', { attrs: { "label": "label", "prop": "prop" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "label": "label", "prop": "value", "sortable": "custom" } })], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'TableCustomSortable',
  data: function data() {
    var d = [{ prop: 'test', value: 9 }, { prop: 'test1', value: 11 }, { prop: 'test2', value: 10 }];
    return {
      origin: d,
      data: d,
      sortOrder: undefined,
      onSortChange: function onSortChange() {}
    };
  },

  methods: {
    getSortData: function getSortData() {
      var tds = this.$el.querySelectorAll('.mtd-table-row .mtd-table-column-default:nth-child(2)');
      var array = [];
      tds.forEach(function (el) {
        array.push(el.innerText);
      });
      return array;
    },
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var sortTh, datas;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.onSortChange = sinon.spy(_this.onSortChange);

                _context.next = 3;
                return waitImmediate();

              case 3:
                sortTh = _this.$el.querySelector('thead .mtd-table-column-default:nth-child(2)');
                // 升序

                triggerClick(sortTh);
                expect(_this.sortOrder).to.be.eql({ prop: 'value', order: 'ascending' });
                _context.next = 8;
                return waitImmediate();

              case 8:
                datas = _this.getSortData();

                expect(datas).to.be.eql(['9', '11', '10']);

                // 降序
                triggerClick(sortTh);
                expect(_this.sortOrder).to.be.eql({ prop: 'value', order: 'descending' });
                _context.next = 14;
                return waitImmediate();

              case 14:
                datas = _this.getSortData();
                expect(datas).to.be.eql(['9', '11', '10']);

                done();

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};