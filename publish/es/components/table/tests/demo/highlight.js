import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { waitImmediate, triggerClick } from '@test/util';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('wt-table', { attrs: { "data": _vm.tableData, "highlight-current-row": "", "row-key": "date" }, on: { "current-change": _vm.handleCurrentChange } }, [_c('wt-table-column', { attrs: { "prop": "date", "label": "日期", "width": "180" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "name", "label": "姓名", "width": "180" } }), _vm._v(" "), _c('wt-table-column', { attrs: { "prop": "address", "label": "地址" } })], 1);
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
      handleCurrentChange: function handleCurrentChange() {}
    };
  },

  methods: {
    doTest: function doTest(done) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var spy, currentRow, firstTD;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                spy = sinon.spy();

                _this.handleCurrentChange = spy;
                _context.next = 4;
                return waitImmediate();

              case 4:
                // wait data render

                currentRow = _this.$el.querySelector('.mtd-table-current-row');

                expect(currentRow).to.be.null();

                firstTD = _this.$el.querySelector('.mtd-table-body-wrapper tr td');

                triggerClick(firstTD, true, true);
                spy.should.have.been.calledOnce();

                _context.next = 11;
                return waitImmediate();

              case 11:
                currentRow = _this.$el.querySelector('.mtd-table-current-row');
                expect(currentRow).to.be.not.null();
                expect(currentRow.querySelector('.mtd-table-column-default').innerText).to.be.eql('2016-05-03');

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