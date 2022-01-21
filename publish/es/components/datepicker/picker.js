import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _typeof from 'babel-runtime/helpers/typeof';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@wish/wt-vue/es/utils/config';
import { Popper, Drop, Reference } from '@wish/wt-vue/es/components/popper';
import { DEFAULT_FORMATS, RANGE_SEPARATOR, TYPE_VALUE_RESOLVER_MAP } from '@wish/wt-vue/es/utils/date';
import { isDate, isString, isArray } from '@wish/wt-vue/es/utils/type';
import { hasProps } from '@wish/wt-vue/es/utils/vnode';
import { error } from '@wish/wt-vue/es/utils/console';

import Input from './input.js';

var isEmptyArray = function isEmptyArray(val) {
  return val.reduce(function (isEmpty, str) {
    return isEmpty && (!str || typeof str === 'string' && str.trim() === '');
  }, true);
};

function eql(a, b) {
  var aValue = _JSON$stringify(a);
  var bValue = _JSON$stringify(b);
  return !a && !b || aValue === bValue && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === (typeof b === 'undefined' ? 'undefined' : _typeof(b));
}

function arrayEql(a, b) {
  return a === b || a && b && a.length === b.length && a.every(function (v1, i) {
    var v2 = b[i];
    return !v1 && !v2 || v1 === v2;
  });
}

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('Popper', { ref: "popper", class: _vm.wrapperClasses, attrs: { "tag": "div", "visible": _vm.open, "placement": _vm.placement, "trigger": "click", "popper-disabled": _vm.disabled, "toggle-on-reference-click": false, "append-to-container": _vm.appendToContainer, "get-popup-container": _vm.getPopupContainer, "popper-options": _vm.popperOptions }, on: { "update:visible": _vm.handleOpenChange } }, [_c('Reference', [_c('PickerInput', { ref: "input", class: [_vm.prefix + '-editor'], attrs: { "id": _vm.elementId, "readonly": _vm.type === 'week' || !_vm.editable || _vm.readonly, "disabled": _vm.disabled, "size": _vm.size, "placeholder": _vm.placeholder ? _vm.placeholder : _vm.type === 'time' ? 'Select Time' : 'Start - End', "current-value": _vm.visualValue, "name": _vm.name, "clearable-on-readonly": "", "suffix-icon": _vm.suffixIcon, "invalid": _vm.invalid, "loading": _vm.loading, "genre": _vm.genre }, on: { "input": _vm.handleInputChange, "clear": _vm.handleClear, "focus": _vm.handleInputFocus, "blur": _vm.handleInputBlur, "enter": _vm.handleInputEnter } }, [_c('wt-icon', { directives: [{ name: "show", rawName: "v-show", value: _vm.pickerType, expression: "pickerType" }], staticClass: "input-icon-suffix", attrs: { "slot": "suffix", "name": _vm.pickerType, "stroke-width": 1, "width": 12, "height": 12 }, slot: "suffix" })], 1)], 1), _vm._v(" "), _c('Drop', { class: _vm.popperClass }, [_c(_vm.panel, _vm._b({ ref: "pickerPanel", tag: "component", attrs: { "show-time": _vm.type === 'datetime' || _vm.type === 'datetimerange', "default-time": _vm.defaultTime, "show-btn-now": _vm.showBtnNow, "confirm": _vm.needConfirm, "selection-mode": _vm.selectionMode, "steps": _vm.steps, "format": _vm.format, "show-now": _vm.showNow, "value": _vm.internalValue, "start-date": _vm.startDate, "split-panels": _vm.splitPanels, "show-week-numbers": _vm.showWeekNumbers, "week-start": _vm.weekStart, "picker-type": _vm.type, "multiple": _vm.multiple, "focused-date": _vm.focusedDate, "visible": _vm.open, "time-picker-options": _vm.timePickerOptions }, on: { "pick": _vm.onPick, "pick-click-now": _vm.handleClickNow, "pick-success": _vm.onPickSuccess, "pick-range": _vm.hanldePickRange, "pick-time-range": _vm.handleTimeRange, "canel": _vm.handleCancel, "current-view-change": _vm.updatePopper }, scopedSlots: _vm._u([{ key: "cell", fn: function fn(scope) {
        return [_vm._t("cell", function () {
          return [_vm._v(_vm._s(scope.cell.desc))];
        }, { "cell": scope.cell })];
      } }], null, true) }, 'component', _vm.ownPickerProps, false), [_vm._t("shortcuts", null, { "slot": "shortcuts" }), _vm._v(" "), _vm._v(" "), _vm.$slots.confirm ? _c('template', { slot: "confirm" }, [_vm._t("confirm")], 2) : _vm._e()], 2)], 1)], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  components: {
    Popper: Popper,
    Drop: Drop,
    Reference: Reference,
    PickerInput: Input
  },
  props: {
    format: {
      type: String
    },
    valueFormat: {
      // 如果没有配置则默认按照当前 value 属性推断
      type: String,
      validator: function validator(v) {
        if (v && /w/i.test(v)) {
          error('DatePicker', 'w、W 格式仅 format 属性可用');
          return false;
        }
        return true;
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    timePickerOptions: {
      default: function _default() {
        return {};
      },
      type: Object
    },
    splitPanels: {
      type: Boolean,
      default: true
    },
    showWeekNumbers: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: Date
    },
    size: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    },
    placement: {
      type: String
    },
    name: {
      type: String
    },
    elementId: {
      type: String
    },
    steps: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    value: {
      type: [Date, String, Array, Number]
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    icon: String,
    appendToContainer: {
      type: Boolean,
      default: true
    },
    getPopupContainer: Function,
    invalid: Boolean,
    loading: Boolean,
    genre: String,
    showBtnNow: {
      type: Boolean,
      default: true
    },
    popperClass: String,
    defaultTime: {
      type: [Array, String]
    },
    popperOptions: Object,
    formatter: Function,
    weekStart: {
      type: Number,
      default: 1,
      validator: function validator(v) {
        return v >= 0 && v <= 6;
      }
    },
    showNow: {
      type: Boolean,
      default: false
    }
  },
  provide: function provide() {
    return {
      CalendarPicker: this
    };
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls,
        getIconCls: getIconCls
      }
    }
  },
  data: function data() {
    var value = this.value;
    // 不可抽成 computed 属性，computed 在 data 之后赋值

    var isRange = this.type.indexOf('range') > -1;
    var emptyArray = isRange ? [null, null] : [null];
    var initialValue = isEmptyArray((isRange ? value : [value]) || []) ? emptyArray : this.parseDate(value);
    return {
      internalValue: initialValue,
      selectionMode: this.onSelectionModeChange(this.type),
      isFocused: false,
      focusedDate: initialValue[0] || this.startDate || new Date(),
      selecting: false, // 目前仅用在 timerange 中，表示是否在选择中
      pickerType: false, // 判断是日期选择器或时间选择器 time时间 calendar日期
      inputValue: '' // 输入框内容
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('date-picker');
    },
    iconPrefix: function iconPrefix() {
      return this.config.getIconCls;
    },
    wrapperClasses: function wrapperClasses() {
      return [this.prefix, _defineProperty({}, this.prefix + '-focused', this.isFocused)];
    },
    visualValue: function visualValue() {
      var text = this.formatDate(this.internalValue);
      if (this.formatter) {
        return this.formatter(this.value, text) || '';
      }
      return text;
    },
    publicVModelValue: function publicVModelValue() {
      if (this.multiple) {
        return this.internalValue.slice();
      } else {
        var isRange = this.type.indexOf('range') > -1;
        var val = this.internalValue.map(function (date) {
          return isDate(date) ? new Date(date) : date || '';
        });
        return isRange ? val : val[0];
      }
    },
    needConfirm: function needConfirm() {
      return this.confirm || ['datetime', 'datetimerange'].indexOf(this.type) > -1 || this.multiple;
    },
    suffixIcon: function suffixIcon() {
      return hasProps(this, 'icon') ? this.icon : ['time', 'timerange'].indexOf(this.type) > -1 ? this.getPickerType('time') : this.getPickerType('calendar');
    },
    shouldFormatValue: function shouldFormatValue() {
      return isArray(this.value) ? isString(this.value[0]) : isString(this.value);
    }
  },
  watch: {
    value: function value(val) {
      this.internalValue = this.parseDate(val);
    },
    type: function type(_type) {
      this.onSelectionModeChange(_type);
    },
    publicVModelValue: function publicVModelValue(now, before) {
      if (this.selecting) {
        return;
      }
      var arrayValue = isArray(now) ? now : [now];
      var parseValues = this.parseDate(this.value);
      var shouldEmitInput = !arrayEql(arrayValue, parseValues) && !eql(now, this.value) && !eql(arrayValue, parseValues) && !eql(now, before);

      if (shouldEmitInput) {
        var inputValue = this.formatToInput(now);
        this.$emit('input', inputValue);
        this.$emit('change', inputValue);
      }
    },
    selecting: function selecting(now, before) {
      if (before && !now) {
        var parseValues = this.parseDate(this.value);
        var shouldEmitInput = !arrayEql(this.internalValue, parseValues);
        if (shouldEmitInput) {
          var sortedDates = this.publicVModelValue.sort(function (a, b) {
            return a.getTime() - b.getTime();
          });
          var inputValue = this.formatToInput(sortedDates);
          this.$emit('input', inputValue);
          this.$emit('change', inputValue);
        }
      }
    },
    open: function open(now, old) {
      if (now) {
        this.onSelectionModeChange(this.type);
        this.reset();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$on('focus-input', function () {
      return _this.focus();
    });
  },

  methods: {
    formatToInput: function formatToInput(date) {
      var _this2 = this;

      var isRange = this.type.indexOf('range') > -1;
      if (isArray(this.value) || this.multiple || isRange) {
        return (date || []).map(this.formatValue).filter(function (d) {
          return _this2.valueFormat ? !!d : d !== undefined;
        });
      }
      return this.formatValue(date);
    },
    formatValue: function formatValue(date) {
      if (this.valueFormat === 'timestamp') {
        return date ? date.getTime() : undefined;
      } else if (this.valueFormat || this.shouldFormatValue) {
        return this.formatDate(date, this.valueFormat || this.format);
      } else {
        return date || undefined;
      }
    },
    handleOpenChange: function handleOpenChange(v) {
      if (this.readonly || this.disabled) {
        return;
      }
      this.$emit('update:open', v);
      if (v) {
        this.$emit('focus');
      } else {
        this.selecting = false;
        this.$emit('blur');
      }
    },
    handleInputFocus: function handleInputFocus() {
      this.isFocused = true;
    },
    handleInputBlur: function handleInputBlur() {
      this.isFocused = false;
    },
    handleInputEnter: function handleInputEnter() {
      if (this.internalValue.length !== 0 && this.internalValue[0] !== null) {
        this.handleOpenChange(true);
        var that = this;
        setTimeout(function () {
          that.handleOpenChange(false);
        }, 1250);
      };
    },
    onSelectionModeChange: function onSelectionModeChange(type) {
      if (this.readonly || this.disabled) {
        return;
      }
      if (type.match(/^date/) || type.match(/^week/)) type = 'date';
      if (type.match(/^month/)) type = 'month';
      if (['year', 'month', 'date', 'time'].indexOf(type) > -1) {
        this.selectionMode = type;
      }
      this.$nextTick(this.updatePopper);
      return this.selectionMode;
    },
    reset: function reset() {
      this.$refs.pickerPanel && this.$refs.pickerPanel.reset && this.$refs.pickerPanel.reset();
    },
    handleInputChange: function handleInputChange(newValue) {
      this.inputValue = newValue;
      // const isArrayValue = this.type.indexOf('range') > -1 || this.multiple;
      var oldValue = this.formatDate(this.internalValue);
      var newDate = this.parseDate(newValue, true);
      var disabledDateFn = this.options && typeof this.options.disabledDate === 'function' && this.options.disabledDate;
      // const valueToTest = isArrayValue ? newDate : newDate[0];
      var isValidDate = newDate.reduce(function (valid, date) {
        return valid && date instanceof Date && !isNaN(date.getTime());
      }, true);
      if (!isValidDate) {
        return;
      }

      var isDisabled = disabledDateFn && newDate.some(disabledDateFn);
      if (newValue !== oldValue && !isDisabled) {
        this.internalValue = newDate.sort(function (a, b) {
          return a.getTime() - b.getTime();
        });
      }
    },
    handleClickNow: function handleClickNow() {
      var dates = this.multiple ? new Date() : this.internalValue.map(function () {
        return new Date();
      });
      this.$emit('click-now');
      this.onPick(dates);
      this.handleOpenChange(false);
      // this.reset();
    },
    handleClear: function handleClear() {
      this.$emit('clear');
      this.internalValue = this.internalValue.map(function () {
        return '';
      });
    },
    hanldePickRange: function hanldePickRange(rangeState) {
      this.$emit('pick-range', rangeState);
    },

    // 格式化 val 为 Date[]
    // 当为输入框手动输入内容时，将强制使用 format 进行格式化
    parseDate: function parseDate(val, forceFormat) {
      // 假设这里的val为120000130000
      var type = this.type,
          valueFormat = this.valueFormat;

      var isRange = this.type.indexOf('range') > -1;

      if (!forceFormat && valueFormat === 'timestamp') {
        if (isRange && (!val || !val.length)) {
          val = [null, null];
        } else if (!isArray(val)) {
          val = [val];
        }
        return val.map(function (v) {
          return v ? new Date(parseInt(v)) : v;
        });
      }

      var parser = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default']).parser;
      var format = this.valueFormat || this.format || DEFAULT_FORMATS[type];
      var multipleParser = TYPE_VALUE_RESOLVER_MAP['multiple'].parser;

      if (this.multiple && val) {
        val = multipleParser(val, format);
      } else if (isRange) {
        if (!val) {
          val = [null, null];
        } else {
          if (typeof val === 'string') {
            val = parser(val, format);
          } else {
            var _val = val,
                _val2 = _slicedToArray(_val, 2),
                start = _val2[0],
                end = _val2[1];

            if (!start || !end) {
              val = [null, null];
            } else if (isDate(start) && isDate(end)) {
              val = val.map(function (date) {
                return new Date(date);
              });
            } else if (isString(start) && isString(end)) {
              val = parser(val.join(RANGE_SEPARATOR), format);
            }
          }
        }
      } else if (val && !isDate(val)) {
        val = parser(val, format) || null;
      }
      return isRange || this.multiple ? val || [] : [val];
    },
    formatDate: function formatDate(value) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.format;

      var defaultFormat = DEFAULT_FORMATS[this.type];
      if (this.multiple) {
        var formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter;
        return formatter(isArray(value) ? value : [value], format || defaultFormat, { weekStart: this.weekStart });
      } else {
        var _ref2 = TYPE_VALUE_RESOLVER_MAP[this.type] || TYPE_VALUE_RESOLVER_MAP['default'],
            _formatter = _ref2.formatter;

        return _formatter(value, format || defaultFormat, { weekStart: this.weekStart });
      }
    },
    onPick: function onPick(dates) {
      var visible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // 若是时间段则排序
      if (isArray(dates)) {
        dates = dates.sort(function (a, b) {
          return a.getTime() - b.getTime();
        });
      }
      if (this.multiple) {
        var pickedTimeStamp = dates.getTime();
        var indexOfPickedDate = this.internalValue.findIndex(function (date) {
          return date && date.getTime() === pickedTimeStamp;
        });
        var allDates = [].concat(_toConsumableArray(this.internalValue), [dates]).filter(Boolean);
        var timeStamps = allDates.map(function (date) {
          return date.getTime();
        }).filter(function (ts, i, arr) {
          return arr.indexOf(ts) === i && i !== indexOfPickedDate;
        }); // filter away duplicates
        this.internalValue = timeStamps.map(function (ts) {
          return new Date(ts);
        });
      } else {
        this.internalValue = Array.isArray(dates) ? dates : [dates];
      }

      if (this.internalValue[0]) {
        this.focusedDate = this.multiple ? this.internalValue[this.internalValue.length - 1] || this.internalValue[0] : this.internalValue[0];
      }

      // reset the selectionMode
      if (!this.needConfirm) {
        this.onSelectionModeChange(this.type);
        if (this.open !== visible) {
          this.handleOpenChange(visible);
        }
      }
    },
    onPickSuccess: function onPickSuccess() {
      this.$emit('confirm');
      this.handleOpenChange(false);
      this.reset();
    },
    handleTimeRange: function handleTimeRange(value) {
      this.selecting = true;
      this.internalValue = value;
    },
    handleCancel: function handleCancel() {
      this.internalValue = this.parseDate(this.value);
      this.handleOpenChange(false);
    },
    focus: function focus() {
      if (this.editable) {
        this.$refs.input.focus();
      }
      this.handleOpenChange(true);
    },
    blur: function blur() {
      this.$refs.input.blur();
      this.handleOpenChange(false);
    },
    updatePopper: function updatePopper() {
      var _this3 = this;

      this.$nextTick(function () {
        var open = _this3.open;

        if (open) {
          var popper = _this3.$refs.popper;

          popper.updatePopper();
        }
      });
    },
    getPickerType: function getPickerType(pickerType) {
      if (pickerType === 'calendar') {
        this.pickerType = 'calendar';
      } else if (pickerType === 'time') {
        this.pickerType = 'clock';
      }
    }
  }
};