import _defineProperty from 'babel-runtime/helpers/defineProperty';
import DateTable from '../../base/date-table';
import YearTable from '../../base/year-table';
import MonthTable from '../../base/month-table';
import TimePicker from '@wish/wt-vue/es/components/timepicker';
import Confirm from '../../base/confirm';
import datePanelLabel from './date-panel-label';
import PickerInput from '../../input.js';
import Mixin from '../panel-mixin';
import DateMixin from './date-panel-mixin';
import Locale from '@wish/wt-vue/es/mixins/locale';
import Icon from '@wish/wt-vue/es/components/icon';

import { DEFAULT_FORMATS, TYPE_VALUE_RESOLVER_MAP, siblingMonth, formatDateLabels } from '@wish/wt-vue/es/utils/date';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes, on: { "mousedown": function mousedown($event) {
        $event.preventDefault();
      } } }, [_vm.shortcuts.length || _vm.$slots.shortcuts ? _c('div', { class: [_vm.panelPrefix + '-sidebar'] }, [_vm._t("shortcuts", function () {
    return _vm._l(_vm.shortcuts, function (shortcut) {
      return _c('div', { key: shortcut.text, class: [_vm.panelPrefix + '-shortcut'], on: { "click": function click($event) {
            return _vm.handleShortcutClick(shortcut);
          } } }, [_vm._v(_vm._s(shortcut.text))]);
    });
  })], 2) : _vm._e(), _vm._v(" "), _c('div', { class: [_vm.panelPrefix + '-body'] }, [_vm.showTime ? _c('div', { class: _vm.prefix + "-time-header" }, [_c('picker-input', { attrs: { "current-value": _vm.visibleDate, "size": "small" } }), _vm._v(" "), _c('time-picker', _vm._b({ ref: "timePicker", attrs: { "size": "small", "icon": "", "value": _vm.visibleTime, "open": _vm.openTime, "placement": "bottom-end", "time-disabled": _vm.timeDisabled, "append-to-container": false }, on: { "update:open": function updateOpen($event) {
        _vm.openTime = $event;
      }, "input": _vm.hanldeTimeChange } }, 'time-picker', _vm.timePickerOptions, false))], 1) : _vm._e(), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView !== 'time', expression: "currentView !== 'time'" }], class: [_vm.prefix + '-header'] }, [_c('span', { class: _vm.iconBtnCls('prev', '-double'), on: { "click": function click($event) {
        return _vm.changeYear(-1);
      } } }, [_c('Icon', { attrs: { "name": "chevrons-left" } })], 1), _vm._v(" "), _vm.pickerTable === 'date-table' ? _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === 'date', expression: "currentView === 'date'" }], class: _vm.iconBtnCls('prev'), on: { "click": function click($event) {
        return _vm.changeMonth(-1);
      } } }, [_c('Icon', { attrs: { "name": "chevron-left" } })], 1) : _vm._e(), _vm._v(" "), _c('date-panel-label', { attrs: { "date-panel-label": _vm.datePanelLabel, "current-view": _vm.pickerTable.split('-').shift(), "date-prefix-cls": _vm.prefix } }), _vm._v(" "), _c('span', { class: _vm.iconBtnCls('next', '-double'), on: { "click": function click($event) {
        return _vm.changeYear(+1);
      } } }, [_c('Icon', { attrs: { "name": "chevrons-right" } })], 1), _vm._v(" "), _vm.pickerTable === 'date-table' ? _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === 'date', expression: "currentView === 'date'" }], class: _vm.iconBtnCls('next'), on: { "click": function click($event) {
        return _vm.changeMonth(+1);
      } } }, [_c('Icon', { attrs: { "name": "chevron-right" } })], 1) : _vm._e()], 1), _vm._v(" "), _c('div', { class: [_vm.panelPrefix + '-content'] }, [_vm.currentView !== 'time' ? _c(_vm.pickerTable, { ref: "pickerTable", tag: "component", attrs: { "table-date": _vm.panelDate, "show-week-numbers": _vm.isWeek || _vm.showWeekNumbers, "is-week": _vm.isWeek, "value": _vm.dates, "selection-mode": _vm.isWeek ? 'week' : _vm.selectionMode, "disabled-date": _vm.disabledDate, "focused-date": _vm.focusedDate, "range-state": _vm.rangeState, "week-start": _vm.weekStart }, on: { "pick": _vm.panelPickerHandlers, "change-range": _vm.handleChangeRange }, scopedSlots: _vm._u([{ key: "cell", fn: function fn(scope) {
        return [_vm._t("cell", null, { "cell": scope.cell })];
      } }], null, true) }) : _vm._e()], 1)])]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'DatePickerPanel',
  components: {
    DateTable: DateTable,
    YearTable: YearTable,
    MonthTable: MonthTable,
    TimePicker: TimePicker,
    datePanelLabel: datePanelLabel,
    Confirm: Confirm,
    PickerInput: PickerInput,
    Icon: Icon
  },
  mixins: [Mixin, Locale, DateMixin],
  inheritAttrs: false,
  props: {
    // more props in the mixin
    multiple: {
      type: Boolean,
      default: false
    },
    defaultTime: {
      type: String
    }
  },
  data: function data() {
    var selectionMode = this.selectionMode,
        value = this.value;


    var dates = value.slice().sort();
    return {
      currentView: selectionMode || 'date',
      pickerTable: this.getTableType(selectionMode),
      dates: dates,
      panelDate: this.startDate || dates[0] || new Date(),
      openTime: false,
      rangeState: {}
    };
  },

  computed: {
    isWeek: function isWeek() {
      return this.pickerType === 'week';
    },
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
    },
    timeDisabled: function timeDisabled() {
      return !this.dates[0];
    },
    visibleTime: function visibleTime() {
      return this.dates[0];
    },
    visibleDate: function visibleDate() {
      return this.formatDate(this.value, 'date');
    }
  },
  watch: {
    value: function value(newVal) {
      this.handleValueChange(newVal);
    },
    currentView: function currentView() {
      var _this2 = this;

      if (this.currentView === 'time') {
        this.$nextTick(function () {
          var spinner = _this2.$refs.timePicker.$refs.timeSpinner;
          spinner.updateScroll();
        });
      }
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
    visible: function visible(v) {
      if (!v) {
        this.handleValueChange(this.value);
      }
    },
    pickerTable: function pickerTable() {
      this.$emit('current-view-change');
    }
  },
  methods: {
    // 日期变换
    handleValueChange: function handleValueChange(newVal) {
      this.dates = newVal;
      this.panelDate = this.startDate || (this.multiple ? this.dates[this.dates.length - 1] : this.dates[0]) || new Date();
      this.rangeState = {};
    },

    // 重置
    reset: function reset() {
      this.currentView = this.selectionMode;
      this.pickerTable = this.getTableType(this.currentView);
    },

    // 切换年份
    changeYear: function changeYear(dir) {
      if (this.selectionMode === 'year' || this.pickerTable === 'year-table') {
        this.panelDate = new Date(this.panelDate.getFullYear() + dir * 10, 0, 1);
      } else {
        this.panelDate = siblingMonth(this.panelDate, dir * 12);
      }
    },

    // 获取面板类型
    getTableType: function getTableType(currentView) {
      return currentView.match(/^time/) ? 'time-picker' : currentView + '-table';
    },

    // 切换月份
    changeMonth: function changeMonth(dir) {
      this.panelDate = siblingMonth(this.panelDate, dir);
    },

    // 年份月份选择切换
    handlePreSelection: function handlePreSelection(value) {
      this.panelDate = value;
      if (this.pickerTable === 'year-table') this.pickerTable = 'month-table';else this.pickerTable = this.getTableType(this.currentView);
    },

    // 选择
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

      if (this.pickerType === 'datetime') {
        var current = this.dates[0];
        var _defaultTimes = (defaultTime || '0:0:0').split(':');
        var _hours = current ? current.getHours() : _defaultTimes[0];
        var _mins = current ? current.getMinutes() : _defaultTimes[1];
        var _sec = current ? current.getSeconds() : _defaultTimes[2];
        value.setHours(_hours, _mins, _sec);
      }

      this.dates = [value];
      this.$emit('pick', value, false);
    },

    // 更改时间
    hanldeTimeChange: function hanldeTimeChange(time) {
      var hours = time ? time.getHours() : 0;
      var mins = time ? time.getMinutes() : 0;
      var sec = time ? time.getSeconds() : 0;
      var d = new Date(this.visibleTime);
      d.setHours(hours, mins, sec);
      this.$emit('pick', d, false);
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

    // 区间切换
    handleChangeRange: function handleChangeRange(val) {
      if (val && this.visible) {
        this.rangeState = {
          from: val,
          to: val
        };
      }
    }
  }
};