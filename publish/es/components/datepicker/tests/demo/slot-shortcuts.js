var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_c('div', { staticClass: "demo-picker-group" }, [_c('p', [_vm._v("日期选择框")]), _vm._v(" "), _c('wt-date-picker', { attrs: { "type": "date", "placeholder": "选择时间" }, model: { value: _vm.value1, callback: function callback($v) {
        _vm.value1 = $v;
      }, expression: "value1" } }, [_c('div', { staticClass: "demo-shortcuts-slot", attrs: { "slot": "shortcuts" }, slot: "shortcuts" }, [_vm._v("\n        hello world\n      ")])])], 1)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  data: function data() {
    return {
      value1: new Date()
    };
  },

  methods: {
    doTest: function doTest(done) {
      var el = this.$el.querySelector('.wt-picker-panel-sidebar .demo-shortcuts-slot');
      expect(el).to.be.not.undefined();
      done();
    }
  }
};