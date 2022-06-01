import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import { clearHours, isInRange } from '@wish/wt-vue/es/utils/date';
import Locale from '@wish/wt-vue/es/mixins/locale';
import jsCalendar from '@wish/wt-vue/es/js-calendar';

import mixin from './mixin';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: (_obj = {}, _obj[_vm.prefix + "-cells"] = true, _obj[_vm.prefix + "-cells-show-week-numbers"] = _vm.showWeekNumbers, _obj[_vm.prefix + "-week-cells"] = _vm.isWeek, _obj) }, [_c('div', { class: [_vm.prefix + "-cells-header"] }, _vm._l(_vm.headerDays, function (day) {
    return _c('span', { key: day }, [_c('em', { staticClass: "header-em" }, [_vm._v(_vm._s(day))])]);
  }), 0), _vm._v(" "), _vm._l(_vm.cells, function (cell, i) {
    return _c('span', { key: String(cell.date) + i, class: [_vm.prefix + "-cells-cell", _vm.getCellCls(cell)], on: { "click": function click($event) {
          return _vm.handleClick(cell, $event);
        }, "mouseenter": function mouseenter($event) {
          return _vm.handleMouseMove(cell);
        } } }, [cell.type !== 'weekLabel' ? _c('em', [_vm._t("cell", function () {
      return [_vm._v(" " + _vm._s(cell.desc) + " ")];
    }, { "cell": cell })], 2) : _c('em', [_vm._v(_vm._s(cell.desc))])]);
  })], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  mixins: [Locale, mixin],

  props: {
    /* more props in mixin */
    showWeekNumbers: {
      type: Boolean,
      default: false
    }

  },
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
    calendar: function calendar() {
      return new jsCalendar.Generator({
        onlyDays: !this.showWeekNumbers,
        weekStart: this.weekStart
      });
    },
    headerDays: function headerDays() {
      var _this = this;

      var weekStart = this.weekStart;

      var translatedDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(function (item) {
        return _this.t('el.datepicker.weeks.' + item);
      });
      var weekDays = translatedDays.splice(weekStart, 7 - weekStart).concat(translatedDays.splice(0, weekStart));
      return this.showWeekNumbers ? [''].concat(weekDays) : weekDays;
    },
    cells: function cells() {
      var isWeek = this.isWeek;

      var tableYear = this.tableDate.getFullYear();
      var tableMonth = this.tableDate.getMonth();

      // timestamp of today
      var today = clearHours(new Date());

      // timestamp of selected days
      var selectedDays = this.dates.map(clearHours);

      var rangeStart = this.state.from && clearHours(this.state.from);
      var rangeEnd = this.state.to && clearHours(this.state.to);
      var rangeDates = [[rangeStart, rangeEnd]];

      if (isWeek) {
        var minDay = selectedDays[0];
        var maxDay = selectedDays[selectedDays.length - 1];
        rangeDates.push([minDay, maxDay]);
      }

      var singleWeek = this.selectionMode === 'week';
      var isRange = this.selectionMode === 'range' || singleWeek;
      var disabledTestFn = typeof this.disabledDate === 'function' && this.disabledDate;
      return this.calendar(tableYear, tableMonth, function (cell) {
        var time = cell.date && clearHours(cell.date);
        var dateIsInCurrentMonth = cell.type === 'monthDay';
        var selected = time && (isWeek && singleWeek || dateIsInCurrentMonth) && selectedDays.indexOf(time) > -1;
        return _extends({}, cell, {
          type: time === today ? 'today' : cell.type,
          selected: selected,
          disabled: cell.date && disabledTestFn && disabledTestFn(new Date(time)),
          range: time && !selected && isRange && (dateIsInCurrentMonth || isWeek) && rangeDates.some(function (dates) {
            return isInRange(time, dates[0], dates[1]);
          })
        });
      }).cells;
    }
  },
  methods: {
    getCellCls: function getCellCls(cell) {
      var _ref;

      var prefix = this.prefix;

      var prefixCls = prefix + '-cells';
      return [(_ref = {}, _defineProperty(_ref, prefixCls + '-cell-selected', cell.selected || cell.start || cell.end), _defineProperty(_ref, prefixCls + '-cell-disabled', cell.disabled), _defineProperty(_ref, prefixCls + '-cell-today', cell.type === 'today'), _defineProperty(_ref, prefixCls + '-cell-prev-month', cell.type === 'prevMonth'), _defineProperty(_ref, prefixCls + '-cell-next-month', cell.type === 'nextMonth'), _defineProperty(_ref, prefixCls + '-cell-week-label', cell.type === 'weekLabel'), _defineProperty(_ref, prefixCls + '-cell-range', cell.range && !cell.start && !cell.end), _defineProperty(_ref, prefixCls + '-focused', clearHours(cell.date) === clearHours(this.focusedDate)), _ref)];
    }
  }
};