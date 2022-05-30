import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { waitImmediate } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-table', { attrs: { "data": _vm.tableData, "highlight-current-row": "", "row-key": "date", "current-row-key": _vm.currentRowKey } }, [_c('wt-table-column', { attrs: { "prop": "date", "label": "日期", "width": "180" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "name", "label": "姓名", "width": "180" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "address", "label": "地址" } })], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  data: function data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-02',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
        tag: '公司'
      }, {
        date: '2016-05-04',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-01',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
        tag: '公司'
      }],
      currentRowKey: '2016-05-03'
    };
  },

  methods: {
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var currentRow;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return waitImmediate();

              case 2:
                // wait data render

                currentRow = _this.$el.querySelector('.mtd-table-current-row');

                expect(currentRow).to.be.not.undefined();
                expect(currentRow.querySelector('.mtd-table-column-default').innerText).to.be.eql(_this.currentRowKey);

                _this.currentRowKey = '2016-05-01';
                _context.next = 8;
                return waitImmediate();

              case 8:
                currentRow = _this.$el.querySelector('.mtd-table-current-row');
                expect(currentRow).to.be.not.undefined();
                expect(currentRow.querySelector('.mtd-table-column-default').innerText).to.be.eql(_this.currentRowKey);
                done();

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};