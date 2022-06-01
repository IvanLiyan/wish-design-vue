import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import DateTable from '../../base/date-table';
import YearTable from '../../base/year-table';
import MonthTable from '../../base/month-table';
import TimePicker from '@wish/wt-vue/es/components/timepicker';
import Confirm from '../../base/confirm';
import PickerInput from '../../input.js';
import Icon from '@wish/wt-vue/es/components/icon';

import { DEFAULT_FORMATS, TYPE_VALUE_RESOLVER_MAP, toDate, initTimeDate, formatDateLabels } from '@wish/wt-vue/es/utils/date';
import datePanelLabel from './date-panel-label';

import Mixin from '../panel-mixin';
import DateMixin from './date-panel-mixin';
import Locale from '@wish/wt-vue/es/mixins/locale';

var dateSorter = function dateSorter(a, b) {
  if (!a || !b) return 0;
  return a.getTime() - b.getTime();
};

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes, on: { "mousedown": function mousedown($event) {
        $event.preventDefault();
      } } }, [_vm.shortcuts.length || _vm.$slots.shortcuts ? _c('div', { class: [_vm.panelPrefix + '-sidebar'] }, [_vm._t("shortcuts", function () {
    return _vm._l(_vm.shortcuts, function (shortcut) {
      return _c('div', { key: shortcut.text, class: [_vm.panelPrefix + '-shortcut'], on: { "click": function click($event) {
            return _vm.handleShortcutClick(shortcut);
          } } }, [_vm._v(_vm._s(shortcut.text))]);
    });
  })], 2) : _vm._e(), _vm._v(" "), _c('div', { class: _vm.panelBodyClasses }, [_c('div', { class: [_vm.panelPrefix + '-content', _vm.panelPrefix + '-content-left'] }, [_c('div', { class: [_vm.prefix + '-header'] }, [_c('span', { class: _vm.iconBtnCls('prev', '-double'), on: { "click": function click($event) {
        return _vm.prevYear('left');
      } } }, [_c('Icon', { attrs: { "name": "chevrons-left" } })], 1), _vm._v(" "), _vm.leftPickerTable === 'date-table' ? _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === 'date', expression: "currentView === 'date'" }], class: _vm.iconBtnCls('prev'), on: { "click": function click($event) {
        return _vm.prevMonth('left');
      } } }, [_c('Icon', { attrs: { "name": "chevron-left" } })], 1) : _vm._e(), _vm._v(" "), _c('date-panel-label', { attrs: { "date-panel-label": _vm.leftDatePanelLabel, "current-view": _vm.leftDatePanelView, "date-prefix-cls": _vm.prefix, "position": "left" } }), _vm._v(" "), _vm.splitPanels || _vm.currentView !== _vm.leftPickerTable.split('-')[0] ? _c('span', { class: _vm.iconBtnCls('next', '-double'), on: { "click": function click($event) {
        return _vm.nextYear('left');
      } } }, [_c('Icon', { attrs: { "name": "chevrons-right" } })], 1) : _vm._e(), _vm._v(" "), _vm.splitPanels && _vm.leftPickerTable === 'date-table' ? _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === 'date', expression: "currentView === 'date'" }], class: _vm.iconBtnCls('next'), on: { "click": function click($event) {
        return _vm.nextMonth('left');
      } } }, [_c('Icon', { attrs: { "name": "chevron-right" } })], 1) : _vm._e()], 1), _vm._v(" "), _c(_vm.leftPickerTable, { ref: "leftYearTable", tag: "component", attrs: { "table-date": _vm.leftPanelDate, "selection-mode": "range", "disabled-date": _vm.disabledDate, "range-state": _vm.rangeState, "show-week-numbers": _vm.isWeek || _vm.showWeekNumbers, "is-week": _vm.isWeek, "value": _vm.preSelecting.left ? [_vm.dates[0]] : _vm.dates, "focused-date": _vm.focusedDate, "picker-type": _vm.pickerType, "week-start": _vm.weekStart }, on: { "change-range": _vm.handleChangeRange, "pick": _vm.panelPickerHandlers.left }, scopedSlots: _vm._u([{ key: "cell", fn: function fn(scope) {
        return [_vm._t("cell", null, { "cell": scope.cell })];
      } }], null, true) }), _vm._v(" "), _vm.showTime ? _c('div', { class: _vm.prefix + "-time-header" }, [_c('time-picker', _vm._b({ ref: "timePicker", attrs: { "size": "small", "placement": "bottom-start", "icon": "", "value": _vm.leftTime, "open": _vm.openLeftTime, "disabled": false, "append-to-container": false }, on: { "update:open": function updateOpen($event) {
        _vm.openLeftTime = $event;
      }, "input": _vm.hanldeLeftTimeChange } }, 'time-picker', _vm.timePickerOptions, false))], 1) : _vm._e()], 1), _c('div', { class: [_vm.panelPrefix + "-content", _vm.panelPrefix + "-content-right"] }, [_c('div', { class: [_vm.prefix + '-header'] }, [_vm.splitPanels || _vm.currentView !== _vm.rightPickerTable.split('-')[0] ? _c('span', { class: _vm.iconBtnCls('prev', '-double'), on: { "click": function click($event) {
        return _vm.prevYear('right');
      } } }, [_c('Icon', { attrs: { "name": "chevrons-left" } })], 1) : _vm._e(), _vm._v(" "), _vm.splitPanels && _vm.rightPickerTable === 'date-table' ? _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === 'date', expression: "currentView === 'date'" }], class: _vm.iconBtnCls('prev'), on: { "click": function click($event) {
        return _vm.prevMonth('right');
      } } }, [_c('Icon', { attrs: { "name": "chevron-left" } })], 1) : _vm._e(), _vm._v(" "), _c('date-panel-label', { attrs: { "date-panel-label": _vm.rightDatePanelLabel, "current-view": _vm.rightDatePanelView, "date-prefix-cls": _vm.prefix, "position": "right" } }), _vm._v(" "), _c('span', { class: _vm.iconBtnCls('next', '-double'), on: { "click": function click($event) {
        return _vm.nextYear('right');
      } } }, [_c('Icon', { attrs: { "name": "chevrons-right" } })], 1), _vm._v(" "), _vm.rightPickerTable === 'date-table' ? _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.currentView === 'date', expression: "currentView === 'date'" }], class: _vm.iconBtnCls('next'), on: { "click": function click($event) {
        return _vm.nextMonth('right');
      } } }, [_c('Icon', { attrs: { "name": "chevron-right" } })], 1) : _vm._e()], 1), _vm._v(" "), _c(_vm.rightPickerTable, { ref: "rightYearTable", tag: "component", attrs: { "table-date": _vm.rightPanelDate, "selection-mode": "range", "range-state": _vm.rangeState, "disabled-date": _vm.disabledDate, "show-week-numbers": _vm.isWeek || _vm.showWeekNumbers, "is-week": _vm.isWeek, "value": _vm.preSelecting.right ? [_vm.dates[_vm.dates.length - 1]] : _vm.dates, "focused-date": _vm.focusedDate, "picker-type": _vm.pickerType, "week-start": _vm.weekStart }, on: { "change-range": _vm.handleChangeRange, "pick": _vm.panelPickerHandlers.right }, scopedSlots: _vm._u([{ key: "cell", fn: function fn(scope) {
        return [_vm._t("cell", null, { "cell": scope.cell })];
      } }], null, true) }), _vm._v(" "), _vm.showTime ? _c('div', { class: _vm.prefix + "-time-header" }, [_c('time-picker', _vm._b({ ref: "timePicker", attrs: { "size": "small", "icon": "", "value": _vm.rightTime, "open": _vm.openRightTime, "placement": "bottom-start", "disabled": false, "append-to-container": false }, on: { "update:open": function updateOpen($event) {
        _vm.openRightTime = $event;
      }, "input": _vm.hanldeRightTimeChange } }, 'time-picker', _vm.timePickerOptions, false))], 1) : _vm._e()], 1), _vm._v(" "), _vm.confirm ? _c('Confirm', { attrs: { "show-time": _vm.showTime, "show-btn-now": _vm.showBtnNow, "time-disabled": _vm.timeDisabled }, on: { "toggle": _vm.handleToggleTime, "click-now": _vm.handlePickClickNow, "confirm": _vm.handlePickSuccess } }, [_vm.$slots.confirm ? _c('template', { slot: "default" }, [_vm._t("confirm")], 2) : _vm._e()], 2) : _vm._e()], 1)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'RangeDatePickerPanel',
  components: {
    DateTable: DateTable,
    YearTable: YearTable,
    MonthTable: MonthTable,
    TimePicker: TimePicker,
    Confirm: Confirm,
    datePanelLabel: datePanelLabel,
    PickerInput: PickerInput,
    Icon: Icon
  },
  mixins: [Mixin, Locale, DateMixin],
  inheritAttrs: false,
  props: {
    // more props in the mixin
    splitPanels: {
      type: Boolean,
      default: false
    },
    defaultTime: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    var _value$map = this.value.map(function (date) {
      return date || initTimeDate();
    }),
        _value$map2 = _slicedToArray(_value$map, 2),
        minDate = _value$map2[0],
        maxDate = _value$map2[1];

    var leftPanelDate = this.startDate ? this.startDate : minDate;

    return {
      dates: [].concat(_toConsumableArray(this.value)),
      rangeState: {
        from: this.value[0],
        to: this.value[1],
        selecting: minDate && !maxDate
      },
      currentView: this.selectionMode || 'range',
      leftPickerTable: this.selectionMode + '-table',
      rightPickerTable: this.selectionMode + '-table',
      leftPanelDate: leftPanelDate,
      rightPanelDate: new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1, 1),

      openLeftTime: false,
      openRightTime: false
    };
  },

  computed: {
    isWeek: function isWeek() {
      return this.pickerType === 'weekrange';
    },
    classes: function classes() {
      var _ref;

      var prefix = this.prefix,
          panelPrefix = this.panelPrefix;

      return [panelPrefix + '-body-wrapper', prefix + '-with-range', (_ref = {}, _defineProperty(_ref, panelPrefix + '-with-sidebar', this.shortcuts.length), _defineProperty(_ref, prefix + '-with-week-numbers', this.showWeekNumbers), _ref)];
    },
    panelBodyClasses: function panelBodyClasses() {
      var _ref2;

      var panelPrefix = this.panelPrefix;

      return [panelPrefix + '-body', (_ref2 = {}, _defineProperty(_ref2, panelPrefix + '-body-time', this.showTime), _defineProperty(_ref2, panelPrefix + '-body-date', !this.showTime), _ref2)];
    },
    leftDatePanelLabel: function leftDatePanelLabel() {
      return this.panelLabelConfig('left');
    },
    rightDatePanelLabel: function rightDatePanelLabel() {
      return this.panelLabelConfig('right');
    },
    leftDatePanelView: function leftDatePanelView() {
      return this.leftPickerTable.split('-').shift();
    },
    rightDatePanelView: function rightDatePanelView() {
      return this.rightPickerTable.split('-').shift();
    },
    timeDisabled: function timeDisabled() {
      return !(this.dates[0] && this.dates[1]);
    },
    preSelecting: function preSelecting() {
      var tableType = this.currentView + '-table';

      return {
        left: this.leftPickerTable !== tableType,
        right: this.rightPickerTable !== tableType
      };
    },
    panelPickerHandlers: function panelPickerHandlers() {
      return {
        left: this.preSelecting.left ? this.handlePreSelection.bind(this, 'left') : this.handleRangePick,
        right: this.preSelecting.right ? this.handlePreSelection.bind(this, 'right') : this.handleRangePick
      };
    },
    leftTime: function leftTime() {
      return this.value[0] || '';
    },
    leftInput: function leftInput() {
      return this.leftTime ? this.formatDateToInput(this.leftTime, 'date') : '';
    },
    rightTime: function rightTime() {
      return this.value[1] || '';
    },
    rightInput: function rightInput() {
      return this.rightTime ? this.formatDateToInput(this.rightTime, 'date') : '';
    }
  },
  watch: {
    value: function value(newVal) {
      this.handleValueChange(newVal);
    },
    currentView: function currentView(_currentView) {
      var leftMonth = this.leftPanelDate.getMonth();
      var rightMonth = this.rightPanelDate.getMonth();
      var isSameYear = this.leftPanelDate.getFullYear() === this.rightPanelDate.getFullYear();

      if (_currentView === 'date' && isSameYear && leftMonth === rightMonth) {
        this.changePanelDate('right', 'Month', 1);
      }
      if (_currentView === 'month' && isSameYear) {
        this.changePanelDate('right', 'FullYear', 1);
      }
      if (_currentView === 'year' && isSameYear) {
        this.changePanelDate('right', 'FullYear', 10);
      }
    },
    selectionMode: function selectionMode(type) {
      this.currentView = type || 'range';
    },
    focusedDate: function focusedDate(date) {
      this.setPanelDates(date || new Date());
    },
    visible: function visible(v) {
      if (!v) {
        this.handleValueChange(this.value);
      }
    }
  },
  created: function created() {
    // 根据当前值设置左右面板
    this.setPanelDates(this.leftPanelDate);
  },

  methods: {
    handleValueChange: function handleValueChange(newVal) {
      var minDate = newVal[0] ? toDate(newVal[0]) : null;
      var maxDate = newVal[1] ? toDate(newVal[1]) : null;
      this.dates = [minDate, maxDate].sort(dateSorter);

      this.rangeState = {
        from: this.dates[0],
        to: this.dates[1],
        selecting: false
      };

      // set panels positioning
      this.setPanelDates(this.startDate || this.dates[0] || new Date());
    },
    reset: function reset() {
      this.currentView = this.selectionMode;
      this.leftPickerTable = this.currentView + '-table';
      this.rightPickerTable = this.currentView + '-table';
    },
    setPanelDates: function setPanelDates(leftPanelDate) {
      this.leftPanelDate = leftPanelDate;
      var rightPanelDate = void 0;
      if (this.currentView === 'month') {
        rightPanelDate = new Date(leftPanelDate.getFullYear() + 1, leftPanelDate.getMonth(), 1);
      } else {
        rightPanelDate = new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1, 1);
      }
      this.rightPanelDate = this.splitPanels ? new Date(Math.max(this.dates[1], rightPanelDate)) : rightPanelDate;
    },
    panelLabelConfig: function panelLabelConfig(direction) {
      var _this = this;

      var locale = this.t('el.locale');
      var datePanelLabel = this.t('el.datepicker.datePanelLabel');
      var handler = function handler(type) {
        var fn = type === 'month' ? _this.showMonthPicker : _this.showYearPicker;
        return function () {
          return fn(direction);
        };
      };

      var date = this[direction + 'PanelDate'];

      var _formatDateLabels = formatDateLabels(locale, datePanelLabel, date),
          labels = _formatDateLabels.labels,
          separator = _formatDateLabels.separator;

      return {
        separator: separator,
        labels: labels.map(function (obj) {
          obj.handler = handler(obj.type);
          return obj;
        })
      };
    },
    prevYear: function prevYear(panel) {
      var increment = this.currentView === 'year' ? -10 : -1;
      this.changePanelDate(panel, 'FullYear', increment);
    },
    nextYear: function nextYear(panel) {
      var increment = this.currentView === 'year' ? 10 : 1;
      this.changePanelDate(panel, 'FullYear', increment);
    },
    prevMonth: function prevMonth(panel) {
      this.changePanelDate(panel, 'Month', -1);
    },
    nextMonth: function nextMonth(panel) {
      this.changePanelDate(panel, 'Month', 1);
    },
    changePanelDate: function changePanelDate(panel, type, increment) {
      var updateOtherPanel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      var current = new Date(this[panel + 'PanelDate']);
      current['set' + type](current['get' + type]() + increment);
      this[panel + 'PanelDate'] = current;

      if (!updateOtherPanel) return;

      if (this.splitPanels) {
        // change other panel if dates overlap
        var otherPanel = panel === 'left' ? 'right' : 'left';
        if (panel === 'left' && this.leftPanelDate >= this.rightPanelDate) {
          this.changePanelDate(otherPanel, type, 1);
        }
        if (panel === 'right' && this.rightPanelDate <= this.leftPanelDate) {
          this.changePanelDate(otherPanel, type, -1);
        }
      } else {
        // keep the panels together
        var _otherPanel = panel === 'left' ? 'right' : 'left';
        var otherCurrent = new Date(this[_otherPanel + 'PanelDate']);
        otherCurrent['set' + type](otherCurrent['get' + type]() + increment);
        this[_otherPanel + 'PanelDate'] = otherCurrent;
      }
    },
    showYearPicker: function showYearPicker(panel) {
      this[panel + 'PickerTable'] = 'year-table';
    },
    showMonthPicker: function showMonthPicker(panel) {
      this[panel + 'PickerTable'] = 'month-table';
    },
    handlePreSelection: function handlePreSelection(panel, value) {
      this[panel + 'PanelDate'] = value;
      var currentViewType = this[panel + 'PickerTable'];
      if (currentViewType === 'year-table') {
        this[panel + 'PickerTable'] = 'month-table';
      } else {
        this[panel + 'PickerTable'] = this.currentView + '-table';
      }

      if (!this.splitPanels) {
        var otherPanel = panel === 'left' ? 'right' : 'left';
        this[otherPanel + 'PanelDate'] = value;
        this.changePanelDate(otherPanel, 'Month', 1, false);
      }
    },
    setDefaultTime: function setDefaultTime(date, oldDate, defaultTime) {
      var time = (defaultTime || '0:0:0').split(':');
      var hours = oldDate ? oldDate.getHours() : time[0];
      var mins = oldDate ? oldDate.getMinutes() : time[1];
      var sec = oldDate ? oldDate.getSeconds() : time[2];
      date.setHours(hours, mins, sec);
      return date;
    },
    handleRangePick: function handleRangePick(val, type) {
      var _this2 = this;

      if (this.rangeState.selecting || this.currentView === 'time') {
        if (this.currentView === 'time') {
          this.dates = val;
        } else {
          var _sort = [this.rangeState.from, val].sort(dateSorter),
              _sort2 = _slicedToArray(_sort, 2),
              minDate = _sort2[0],
              maxDate = _sort2[1];

          var dates = [minDate, maxDate].map(function (date, i) {
            return _this2.setDefaultTime(date, _this2.value[i], _this2.defaultTime[i]);
          });

          // 暂时不处理，待确定交互
          // if (dates[0].getTime() > dates[1].getTime()) {
          //   // 会出现同一天 minDate > maxDate 情况，忽略第二次的值，要求用户重新选择
          //   return;
          // }

          this.dates = dates;
          this.rangeState = {
            from: minDate,
            to: maxDate,
            selecting: false
          };
        }
        this.handleConfirm(false, type || 'date');
      } else {
        this.rangeState = {
          from: val,
          to: null,
          selecting: true
        };
      }
      this.$emit('pick-range', this.rangeState);
    },
    handleChangeRange: function handleChangeRange(val) {
      if (!this.rangeState.selecting) {
        if (this.isWeek) {
          this.rangeState.from = val;
          this.rangeState.to = val;
        }
        return;
      }
      this.rangeState.to = val;
    },
    hanldeLeftTimeChange: function hanldeLeftTimeChange(time) {
      var left = this.dates[0];
      var hours = time ? time.getHours() : 0;
      var mins = time ? time.getMinutes() : 0;
      var sec = time ? time.getSeconds() : 0;
      var d = new Date(left);

      d.setHours(hours, mins, sec);

      this.dates[0] = d;
      // 保证 left time 一定小于 right time。
      // to fix ones(https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3167759)
      if (this.dates[0].getTime() > this.dates[1].getTime()) {
        this.dates[1].setHours(hours, mins, sec);
      }
      this.handleConfirm(false);
    },
    hanldeRightTimeChange: function hanldeRightTimeChange(time) {
      var right = this.dates[1];

      var hours = time ? time.getHours() : 0;
      var mins = time ? time.getMinutes() : 0;
      var sec = time ? time.getSeconds() : 0;
      var d = new Date(right);

      d.setHours(hours, mins, sec);

      this.dates[1] = d;
      this.handleConfirm(false);
    },
    formatDateToInput: function formatDateToInput(value, type) {
      var format = this.format;
      if (format) {
        format = format.split(' ')[0];
      }
      format = format || DEFAULT_FORMATS[type];

      var _ref3 = TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default'],
          formatter = _ref3.formatter;

      return formatter(value, format);
    }
  }
};