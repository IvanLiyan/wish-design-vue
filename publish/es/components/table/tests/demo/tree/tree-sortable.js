import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { findVM, waitImmediate } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-table', { attrs: { "data": _vm.tableData, "tree": "", "expand-row-keys": _vm.expands, "row-key": "id", "sort-order": _vm.sortOrder }, on: { "update:expandRowKeys": function updateExpandRowKeys($event) {
        _vm.expands = $event;
      }, "update:expand-row-keys": function updateExpandRowKeys($event) {
        _vm.expands = $event;
      }, "update:sortOrder": function updateSortOrder($event) {
        _vm.sortOrder = $event;
      }, "update:sort-order": function updateSortOrder($event) {
        _vm.sortOrder = $event;
      } } }, [_c('wt-table-column', { attrs: { "prop": "id", "label": "工单号", "sortable": "" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "status", "label": "状态", "width": "100" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "author", "label": "申请人", "width": "100" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "email", "label": "邮箱", "width": "220" } })], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  data: function data() {
    return {
      expands: ['243304314807'],
      tableData: [{
        id: '243304314806',
        status: '待审核',
        author: '白居易',
        email: 'baijuyi@meituan.com'
      }, {
        id: '243304314807',
        status: '已通过',
        author: '王维',
        email: 'wangwei@meituan.com',
        children: [{
          id: '243304314807-3',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
          children: [{
            id: '243304314807-3-1',
            status: '已通过',
            author: '王维',
            email: 'wangwei@meituan.com'
          }, {
            id: '243304314807-3-2',
            status: '已通过',
            author: '王维',
            email: 'wangwei@meituan.com'
          }]
        }, {
          id: '243304314807-1',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com'
        }, {
          id: '243304314807-2',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com'
        }]
      }, {
        id: '243304314808',
        status: '已通过',
        author: '王维',
        email: 'wangwei@meituan.com'
      }, {
        id: '243304314809',
        status: '已通过',
        author: '陶渊明',
        email: 'taoyuanmming@meituan.com',
        children: [{
          id: '243304314809-1',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com'
        }, {
          id: '243304314809-2',
          status: '已驳回',
          author: '陶渊明',
          email: 'taoyuanmming@meituan.com'
        }]
      }],
      sortOrder: {
        order: 'ascending',
        prop: 'id'
      }
    };
  },

  methods: {
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var table, data, ids;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                table = findVM(_this, { name: 'Table' });
                data = table.store.states.data;
                ids = data.map(function (item) {
                  return item.id;
                });


                expect(ids).to.be.eql(['243304314806', '243304314807', '243304314807-1', '243304314807-2', '243304314807-3', '243304314808', '243304314809'], 'ascending');

                _this.sortOrder = {
                  order: 'descending',
                  prop: 'id'
                };
                _context.next = 7;
                return waitImmediate();

              case 7:
                data = table.store.states.data;
                ids = data.map(function (item) {
                  return item.id;
                });

                expect(ids).to.be.eql(['243304314809', '243304314808', '243304314807', '243304314807-3', '243304314807-2', '243304314807-1', '243304314806'], 'descending');

                done();

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};