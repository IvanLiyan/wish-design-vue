var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('div', { staticClass: "demo-picker-group" }, [_c('p', [_vm._v("按周选择")]), _vm._v(" "), _c('wt-date-picker', { attrs: { "type": "week", "placeholder": "选择一周" }, scopedSlots: _vm._u([{ key: "cell", fn: function fn(scope) {
        return _c('span', { staticClass: "demo-week-cell-slot" }, [_vm._v("\n      " + _vm._s(scope.cell.desc) + "\n    ")]);
      } }]), model: { value: _vm.value1, callback: function callback($v) {
        _vm.value1 = $v;
      }, expression: "value1" } })], 1)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  data: function data() {
    return {
      value1: null
    };
  },

  methods: {
    doTest: function doTest(done) {
      var el = this.$el.querySelector('.wt-picker-panel-sidebar .demo-week-cell-slot');
      expect(el).to.be.not.undefined();
      done();
    }
  }
};