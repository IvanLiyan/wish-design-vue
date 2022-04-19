import _defineProperty from 'babel-runtime/helpers/defineProperty';
import DateTable from '../../base/date-table';
import YearTable from '../../base/year-table';
import MonthTable from '../../base/month-table';
import Confirm from '../../base/confirm';
import datePanelLabel from './date-panel-label';
import PickerInput from '../../input.js';
import Mixin from '../panel-mixin';
import DateMixin from './date-panel-mixin';
import Locale from '@wish/wt-vue/es/mixins/locale';
import Icon from '@wish/wt-vue/es/components/icon';

import { DEFAULT_FORMATS, TYPE_VALUE_RESOLVER_MAP, siblingMonth, formatDateLabels, getFirstDayOfWeek, getLastDayOfWeek } from '@wish/wt-vue/es/utils/date';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes, on: { "mousedown": function mousedown($event) {
        $event.preventDefault();
      } } }, [_vm.shortcuts.length || _vm.$slots.shortcuts ? _c('div', { class: [_vm.panelPrefix + '-sidebar'] }, [_vm._t("shortcuts", function () {
    return _vm._l(_vm.shortcuts, function (shortcut) {
      return _c('div', { key: shortcut.text, class: [_vm.panelPrefix + '-shortcut'], on: { "click": function click($event) {
            return _vm.handleShortcutClick(shortcut);
          } } }, [_vm._v(_vm._s(shortcut.text))]);
    });
  })], 2) : _vm._e(), _vm._v(" "), _c('div', { class: [_vm.panelPrefix + '-body'] }, [_c('div', { class: [_vm.prefix + '-header'] }, [_c('span', { class: _vm.iconBtnCls('prev', '-double'), on: { "click": function click($event) {
        return _vm.changeYear(-1);
      } } }, [_c('Icon', { attrs: { "name": "chevrons-left" } })], 1), _vm._v(" "), _vm.pickerTable === 'date-table' ? _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === 'date', expression: "currentView === 'date'" }], class: _vm.iconBtnCls('prev'), on: { "click": function click($event) {
        return _vm.changeMonth(-1);
      } } }, [_c('Icon', { attrs: { "name": "chevron-left" } })], 1) : _vm._e(), _vm._v(" "), _c('date-panel-label', { attrs: { "date-panel-label": _vm.datePanelLabel, "current-view": _vm.pickerTable.split('-').shift(), "date-prefix-cls": _vm.prefix } }), _vm._v(" "), _c('span', { class: _vm.iconBtnCls('next', '-double'), on: { "click": function click($event) {
        return _vm.changeYear(+1);
      } } }, [_c('Icon', { attrs: { "name": "chevrons-right" } })], 1), _vm._v(" "), _vm.pickerTable === 'date-table' ? _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === 'date', expression: "currentView === 'date'" }], class: _vm.iconBtnCls('next'), on: { "click": function click($event) {
        return _vm.changeMonth(+1);
      } } }, [_c('Icon', { attrs: { "name": "chevron-right" } })], 1) : _vm._e()], 1), _vm._v(" "), _c('div', { class: [_vm.panelPrefix + '-content'] }, [_c(_vm.pickerTable, { ref: "pickerTable", tag: "component", attrs: { "table-date": _vm.panelDate, "show-week-numbers": true, "week-start": _vm.weekStart, "value": _vm.dates, "range-state": _vm.rangeState, "selection-mode": "range", "disabled-date": _vm.disabledDate, "focused-date": _vm.focusedDate, "is-week": true }, on: { "pick": _vm.panelPickerHandlers, "change-range": _vm.handleChangeRange }, scopedSlots: _vm._u([{ key: "cell", fn: function fn(scope) {
        return [_vm._t("cell", null, { "cell": scope.cell })];
      } }], null, true) })], 1), _vm._v(" "), _vm.confirm ? _c('Confirm', { attrs: { "show-time": _vm.showTime, "show-btn-now": _vm.showBtnNow }, on: { "click-now": _vm.handlePickClickNow, "confirm": _vm.handlePickSuccess } }, [_vm.$slots.confirm ? _c('template', { slot: "default" }, [_vm._t("confirm")], 2) : _vm._e()], 2) : _vm._e()], 1)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WeekPickerPanel',
  components: {
    DateTable: DateTable,
    YearTable: YearTable,
    MonthTable: MonthTable,
    datePanelLabel: datePanelLabel,
    Confirm: Confirm,
    PickerInput: PickerInput,
    Icon: Icon
  },
  mixins: [Mixin, Locale, DateMixin],
  inheritAttrs: false,
  props: {
    visible: Boolean
  },
  data: function data() {
    var selectionMode = this.selectionMode,
        value = this.value;

    var first = value[0];
    var dates = first ? [getFirstDayOfWeek(first, this.weekStart), getLastDayOfWeek(first, this.weekStart)] : [];
    return {
      currentView: selectionMode || 'range',
      pickerTable: this.getTableType(selectionMode),
      dates: dates,
      rangeState: {
        from: dates[0],
        to: dates[1],
        selecting: false
      },
      panelDate: this.startDate || dates[0] || new Date()
    };
  },

  computed: {
    classes: function classes() {
      var panelPrefix = this.panelPrefix;

      return [panelPrefix + '-body-wrapper', _defineProperty({}, panelPrefix + '-with-sidebar', this.shortcuts.length)];
    },
    panelPickerHandlers: function panelPickerHandlers() {
      return this.pickerTable === this.currentView + '-table' ? this.handlePick : this.handlePreSelection;
    },
    datePanelLabel: function datePanelLabel() {
      var _this = this;

      var locale = this.t('el.locale');
      var datePanelLabel = this.t('el.datepicker.datePanelLabel');
      var date = this.panelDate;

      var _formatDateLabels = formatDateLabels(locale, datePanelLabel, date),
          labels = _formatDateLabels.labels,
          separator = _formatDateLabels.separator;

      var handler = function handler(type) {
        return function () {
          _this.pickerTable = _this.getTableType(type); // eslint-disable-line
          return _this.pickerTable;
        };
      };

      return {
        separator: separator,
        labels: labels.map(function (obj) {
          obj.handler = handler(obj.type);
          return obj;
        })
      };
    }
  },
  watch: {
    value: function value(newVal) {
      this.handleValueChange(newVal);
    },
    pickerTable: function pickerTable() {
      this.$emit('current-view-change');
    },
    selectionMode: function selectionMode(type) {
      this.currentView = type;
      this.pickerTable = this.getTableType(type);
    },
    focusedDate: function focusedDate(date) {
      var isDifferentYear = date.getFullYear() !== this.panelDate.getFullYear();
      var isDifferentMonth = isDifferentYear || date.getMonth() !== this.panelDate.getMonth();
      if (isDifferentYear || isDifferentMonth) {
        this.panelDate = date;
      }
    },
    visible: function visible(_visible) {
      this.handleValueChange(this.value);
    }
  },
  methods: {
    handleValueChange: function handleValueChange(newVal) {
      var first = newVal[0];
      var dates = first ? [getFirstDayOfWeek(first, this.weekStart), getLastDayOfWeek(first, this.weekStart)] : [];
      this.dates = dates;
      this.rangeState = {
        from: dates[0],
        to: dates[1],
        selecting: false
      };
      this.panelDate = this.startDate || dates[0] || new Date();
    },
    reset: function reset() {
      this.currentView = this.selectionMode;
      this.pickerTable = this.getTableType(this.currentView);
    },
    changeYear: function changeYear(dir) {
      if (this.selectionMode === 'year' || this.pickerTable === 'year-table') {
        this.panelDate = new Date(this.panelDate.getFullYear() + dir * 10, 0, 1);
      } else {
        this.panelDate = siblingMonth(this.panelDate, dir * 12);
      }
    },
    getTableType: function getTableType(currentView) {
      return currentView + '-table';
    },
    changeMonth: function changeMonth(dir) {
      this.panelDate = siblingMonth(this.panelDate, dir);
    },
    handlePreSelection: function handlePreSelection(value) {
      this.panelDate = value;
      if (this.pickerTable === 'year-table') this.pickerTable = 'month-table';else this.pickerTable = this.getTableType(this.currentView);
    },
    handlePick: function handlePick(value, type) {
      var selectionMode = this.selectionMode,
          panelDate = this.panelDate,
          defaultTime = this.defaultTime;

      if (selectionMode === 'year') value = new Date(value.getFullYear(), 0, 1);else if (selectionMode === 'month') {
        value = new Date(panelDate.getFullYear(), value.getMonth(), 1);
      } else {
        value = new Date(value);
        if (defaultTime) {
          var defaultTimes = defaultTime.split(':');
          var hours = defaultTimes[0];
          var mins = defaultTimes[1];
          var sec = defaultTimes[2];
          value.setHours(hours, mins, sec);
        }
      }

      this.dates = [value];
      this.$emit('pick', value, false);
    },
    formatDate: function formatDate(value, type) {
      var format = this.format;
      if (format) {
        format = format.split(' ')[0];
      }

      format = format || DEFAULT_FORMATS[type];

      var _ref2 = TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default'],
          formatter = _ref2.formatter;

      return formatter(value, format);
    },
    handleChangeRange: function handleChangeRange(val) {
      if (val) {
        var _ref3 = [getFirstDayOfWeek(val, this.weekStart), getLastDayOfWeek(val, this.weekStart)],
            from = _ref3[0],
            to = _ref3[1];

        this.rangeState.from = from;
        this.rangeState.to = to;
      }
    }
  }
};