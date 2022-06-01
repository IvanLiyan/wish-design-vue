import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { findVM, wait, waitImmediate, triggerClick } from '@test/util';
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-table', { attrs: { "data": _vm.tableData, "tree": "", "expand-row-keys": _vm.expands, "row-key": "id", "row-class": _vm.rowClass, "load-data": _vm.loadData }, on: { "update:expandRowKeys": function updateExpandRowKeys($event) {
        _vm.expands = $event;
      }, "update:expand-row-keys": function updateExpandRowKeys($event) {
        _vm.expands = $event;
      } } }, [_c('wt-table-column', { attrs: { "prop": "id", "label": "工单号", "sortable": "", "filters": [{ text: '243304314806', value: '243304314806' }, { text: '243304314807', value: '243304314807' }, { text: '243304314809', value: '243304314809' }], "filter-method": _vm.filterName } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "status", "label": "状态", "width": "100" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "author", "label": "申请人", "width": "100" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "email", "label": "邮箱", "width": "220" } })], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  data: function data() {
    return {
      expands: [],
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
            id: '243304314807-1-2',
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
      loadData: sinon.spy(this.load)
    };
  },

  methods: {
    rowClass: function rowClass(_ref) {
      var row = _ref.row;

      return 'row-' + row.id;
    },
    filterName: function filterName(value, row) {
      return value === row.id;
    },
    load: function load(row, callback) {
      var id = row.id;

      setTimeout(function () {
        callback([{
          id: id + '-1',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
          isLeaf: true
        }, {
          id: id + '-2',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
          isLeaf: true
        }]);
      }, 100);
    },
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var icon, table, data, ids, icon2;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return waitImmediate();

              case 2:
                icon = _this.$el.querySelector('.row-243304314806 .mtd-table-tree-expand-icon');

                expect(icon).to.be.ok();
                triggerClick(icon);
                _context.next = 7;
                return wait(300);

              case 7:

                expect(_this.expands).to.be.eql(['243304314806']);
                _this.loadData.should.been.calledOnce();
                table = findVM(_this, { name: 'Table' });
                data = table.store.states.data;
                ids = data.map(function (row) {
                  return row.id;
                });

                expect(ids).to.be.eql(['243304314806', '243304314806-1', '243304314806-2', '243304314807', '243304314808', '243304314809'], 'remote load children');

                icon2 = _this.$el.querySelector('.row-243304314807 .mtd-table-tree-expand-icon');

                expect(icon2).to.be.ok();
                triggerClick(icon2);
                _context.next = 18;
                return wait(300);

              case 18:
                expect(_this.expands).to.be.eql(['243304314806', '243304314807']);

                // not call loadData more
                _this.loadData.should.been.calledOnce();
                data = table.store.states.data;
                ids = data.map(function (row) {
                  return row.id;
                });
                expect(ids).to.be.eql(['243304314806', '243304314806-1', '243304314806-2', '243304314807', '243304314807-1', '243304314807-2', '243304314807-3', '243304314808', '243304314809'], 'expanded local');
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