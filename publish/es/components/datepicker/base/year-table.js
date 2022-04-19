import _defineProperty from 'babel-runtime/helpers/defineProperty';
import { clearHours, isInRange } from '@wish/wt-vue/es/utils/date';
import { deepCopy } from '@wish/wt-vue/es/utils/util';
import mixin from './mixin';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, _vm._l(_vm.cells, function (cell, i) {
    return _c('span', { key: i, class: _vm.getCellCls(cell), on: { "click": function click($event) {
          return _vm.handleClick(cell);
        }, "mouseenter": function mouseenter($event) {
          return _vm.handleMouseMove(cell);
        } } }, [_c('em', [_vm._v(_vm._s(cell.date.getFullYear()))])]);
  }), 0);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  mixins: [mixin],
  props: {/* in mixin */},
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('date-picker');
    },
    prefixCls: function prefixCls() {
      return this.prefix + '-cells';
    },
    classes: function classes() {
      var prefixCls = this.prefixCls;

      return ['' + prefixCls, prefixCls + '-year'];
    },
    startYear: function startYear() {
      return Math.floor(this.tableDate.getFullYear() / 10) * 10;
    },
    cells: function cells() {
      var cells = [];
      var cellTmpl = {
        text: '',
        selected: false,
        disabled: false
      };
      var tableYear = this.tableDate.getFullYear();

      var selectedDays = this.dates.filter(Boolean).map(function (date) {
        return clearHours(new Date(date.getFullYear(), 0, 1));
      });
      var focusedDate = clearHours(new Date(this.focusedDate.getFullYear(), 0, 1));
      var isRange = this.selectionMode === 'range' && this.pickerType === 'yearrange';
      var _rangeState = this.rangeState,
          from = _rangeState.from,
          to = _rangeState.to;

      for (var i = 0; i < 12; i++) {
        var cell = deepCopy(cellTmpl);
        cell.date = new Date(this.startYear + i, 0, 1);
        cell.disabled = typeof this.disabledDate === 'function' && this.disabledDate(cell.date) && (this.selectionMode === 'year' || this.pickerType === 'yearrange');
        var day = clearHours(cell.date);
        cell.selected = selectedDays.indexOf(day) > -1;
        cell.focused = day === focusedDate;
        if (isRange && !cell.selected) {
          var date = new Date(tableYear, i, 1, 0, 0, 0);
          cell.range = isInRange(date.getTime(), from && from.getTime(), to && to.getTime());
        }
        cells.push(cell);
      }
      return cells;
    }
  },
  methods: {
    getCellCls: function getCellCls(cell) {
      var _ref;

      var prefixCls = this.prefixCls;

      return [prefixCls + '-cell', (_ref = {}, _defineProperty(_ref, prefixCls + '-cell-selected', cell.selected), _defineProperty(_ref, prefixCls + '-cell-disabled', cell.disabled), _defineProperty(_ref, prefixCls + '-cell-focused', cell.focused), _defineProperty(_ref, prefixCls + '-cell-range', cell.range && !cell.start && !cell.end), _ref)];
    }
  }
};