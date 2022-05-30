import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { triggerClick, waitImmediate } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-table', { attrs: { "data": _vm.data, "sort-order": _vm.sortOrder }, on: { "update:sortOrder": function updateSortOrder($event) {
        _vm.sortOrder = $event;
      }, "update:sort-order": function updateSortOrder($event) {
        _vm.sortOrder = $event;
      } } }, [_c('wt-table-column', { attrs: { "label": "label", "prop": "prop" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "label": "label", "prop": "value", "sortable": "" } })], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'TableSrotable',
  data: function data() {
    return {
      data: [{ prop: 'test', value: 9 }, { prop: 'test1', value: 11 }, { prop: 'test2', value: 10 }],
      sortOrder: undefined
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
                _context.next = 2;
                return waitImmediate();

              case 2:
                sortTh = _this.$el.querySelector('thead .mtd-table-column-default:nth-child(2)');
                // 升序

                triggerClick(sortTh);
                expect(_this.sortOrder).to.be.eql({ prop: 'value', order: 'ascending' });
                _context.next = 7;
                return waitImmediate();

              case 7:
                datas = _this.getSortData();

                expect(datas).to.be.eql(['9', '10', '11']);

                // 降序
                triggerClick(sortTh);
                expect(_this.sortOrder).to.be.eql({ prop: 'value', order: 'descending' });
                _context.next = 13;
                return waitImmediate();

              case 13:
                datas = _this.getSortData();
                expect(datas).to.be.eql(['11', '10', '9']);

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