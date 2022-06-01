import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { findVM, waitImmediate } from '@test/util';
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-table', { attrs: { "data": _vm.tableData, "tree": "", "expand-row-keys": _vm.expands, "row-key": "id" }, on: { "update:expandRowKeys": function updateExpandRowKeys($event) {
        _vm.expands = $event;
      }, "update:expand-row-keys": function updateExpandRowKeys($event) {
        _vm.expands = $event;
      } } }, [_c('wt-table-column', { attrs: { "prop": "id", "label": "工单号", "sortable": "", "filters": [{ text: '243304314806', value: '243304314806' }, { text: '243304314807', value: '243304314807' }, { text: '243304314809', value: '243304314809' }], "filter-method": _vm.filterName, "filtered-value": _vm.filtered }, on: { "update:filteredValue": function updateFilteredValue($event) {
        _vm.filtered = $event;
      }, "update:filtered-value": function updateFilteredValue($event) {
        _vm.filtered = $event;
      } } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "status", "label": "状态", "width": "100" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "author", "label": "申请人", "width": "100" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "email", "label": "邮箱", "width": "220" } })], 1);
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
          id: '243304314807-1',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
          children: [{
            id: '243304314807-1-1',
            status: '已通过',
            author: '王维',
            email: 'wangwei@meituan.com'
          }, {
            id: '243304314807-2-1',
            status: '已通过',
            author: '王维',
            email: 'wangwei@meituan.com'
          }]
        }, {
          id: '243304314807-2',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com'
        }, {
          id: '243304314807-3',
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
      filtered: []
    };
  },

  methods: {
    filterName: function filterName(value, row) {
      return value === row.id;
    },
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var table, data;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return waitImmediate();

              case 2:
                table = findVM(_this, { name: 'Table' });

                _this.filtered = ['243304314809'];
                _context.next = 6;
                return waitImmediate();

              case 6:
                data = table.store.states.data;

                expect(data.length).to.be.equal(1);
                expect(data[0].id).to.be.equal('243304314809');
                done();

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};