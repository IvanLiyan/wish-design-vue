var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('span', { class: _vm.datePrefixCls + "-current" }, [_vm.datePanelLabel ? _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.datePanelLabel.labels[0].type === 'year' || _vm.currentView === 'date', expression: "datePanelLabel.labels[0].type === 'year' ||\n      currentView === 'date'" }], class: [_vm.datePrefixCls + '-header-label'], on: { "click": _vm.datePanelLabel.labels[0].handler } }, [_vm._v("\n    " + _vm._s(this.$props.currentView !== 'year' ? _vm.datePanelLabel.labels[0].label : _vm.yearRangeValue) + "\n  ")]) : _vm._e(), _vm._v(" "), _vm.datePanelLabel && _vm.currentView === 'date' ? [_vm._v("\n    " + _vm._s(_vm.datePanelLabel.separator) + "\n  ")] : _vm._e(), _vm._v(" "), _vm.datePanelLabel ? _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.datePanelLabel.labels[1].type === 'year' || _vm.currentView === 'date', expression: "datePanelLabel.labels[1].type === 'year' ||\n      currentView === 'date'" }], class: [_vm.datePrefixCls + '-header-label'], on: { "click": _vm.datePanelLabel.labels[1].handler } }, [_vm._v("\n    " + _vm._s(_vm.datePanelLabel.labels[1].label) + "\n  ")]) : _vm._e()], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  props: {
    datePanelLabel: Object,
    currentView: String,
    datePrefixCls: String,
    position: String
  },
  computed: {
    // 年份区间渲染
    yearRangeValue: function yearRangeValue() {
      if (this.$props.currentView === 'year' && this.$props.position === 'right') {
        var startYear = parseInt(this.$props.datePanelLabel.labels[0].label.substr(0, 3) + '0') + 12;
        var endYear = startYear + 11;
        return startYear + ' - ' + endYear;
      } else {
        var _startYear = Math.floor(parseInt(this.$props.datePanelLabel.labels[0].label) / 10) * 10;
        var _endYear = parseInt(_startYear) + 11;
        return _startYear + ' - ' + _endYear;
      };
    }
  }
};