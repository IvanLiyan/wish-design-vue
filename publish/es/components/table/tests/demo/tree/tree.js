import { findVM } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-table', { attrs: { "data": _vm.tableData, "tree": "", "expand-row-keys": _vm.expands, "row-key": "id" }, on: { "update:expandRowKeys": function updateExpandRowKeys($event) {
        _vm.expands = $event;
      }, "update:expand-row-keys": function updateExpandRowKeys($event) {
        _vm.expands = $event;
      } } }, [_c('wt-table-column', { attrs: { "prop": "id", "label": "工单号" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "status", "label": "状态", "width": "100" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "author", "label": "申请人", "width": "100" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "email", "label": "邮箱", "width": "220" } })], 1);
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
      }]
    };
  },

  methods: {
    doTest: function doTest(done) {
      var table = findVM(this, { name: 'Table' });
      var data = table.store.states.data;
      var ids = data.map(function (item) {
        return item.id;
      });

      expect(ids).to.be.eql(['243304314806', '243304314807', '243304314807-1', '243304314807-2', '243304314807-3', '243304314808', '243304314809']);
      done();
    }
  }
};