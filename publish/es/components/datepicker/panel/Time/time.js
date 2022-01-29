import _Object$keys from 'babel-runtime/core-js/object/keys';
import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import TimeSpinner from '../../base/time-spinner';
import Confirm from '../../base/confirm';
import Options from '../../time-mixins';

import Mixin from '../panel-mixin';
import Locale from '@wish/wt-vue/es/mixins/locale';

import { initTimeDate } from '@wish/wt-vue/es/utils/date';

var capitalize = function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
};
var mergeDateHMS = function mergeDateHMS(date, hours, minutes, seconds) {
  var newDate = new Date(date.getTime());
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(seconds);
  return newDate;
};
var unique = function unique(el, i, arr) {
  return arr.indexOf(el) === i;
};
var returnFalse = function returnFalse() {
  return false;
};

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.panelPrefix + '-body-wrapper'], on: { "mousedown": function mousedown($event) {
        $event.preventDefault();
      } } }, [_c('div', { class: [_vm.panelPrefix + '-body'] }, [_vm.showDate ? _c('div', { class: [_vm.timePrefix + '-header'] }, [_vm._v(_vm._s(_vm.visibleDate))]) : _vm._e(), _vm._v(" "), _c('div', { class: [_vm.panelPrefix + '-content'] }, [_c('time-spinner', { ref: "timeSpinner", attrs: { "show-seconds": _vm.showSeconds, "show-minutes": _vm.showMinutes, "steps": _vm.steps, "hours": _vm.timeSlots[0], "minutes": _vm.timeSlots[1], "seconds": _vm.timeSlots[2], "disabled-hours": _vm.disabledHMS.disabledHours, "disabled-minutes": _vm.disabledHMS.disabledMinutes, "disabled-seconds": _vm.disabledHMS.disabledSeconds, "hide-disabled-options": _vm.hideDisabledOptions }, on: { "change": _vm.handleChange } })], 1), _vm._v(" "), _vm.confirm ? _c('Confirm', { attrs: { "show-btn-now": _vm.showBtnNow }, on: { "click-now": _vm.handlePickClickNow, "confirm": _vm.handlePickSuccess } }) : _vm._e(), _vm._v(" "), _c('div', { class: [_vm.panelPrefix + '-footer'] }, [_vm.showNow ? _c('span', { staticClass: "select-now", attrs: { "type": "primary" }, on: { "click": _vm.handleSelectNow } }, [_vm._v("\n        当前时间\n      ")]) : _c('span'), _vm._v(" "), _c('wt-button', { class: !_vm.confirmDisabled ? 'btn' : 'btn disabled', attrs: { "type": "primary", "disabled": _vm.confirmDisabled }, on: { "click": _vm.handleConfirm } }, [_vm._v("\n        确认\n      ")])], 1)], 1)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'TimePickerPanel',
  components: { TimeSpinner: TimeSpinner, Confirm: Confirm },
  mixins: [Mixin, Locale, Options],
  props: {
    disabledDate: {
      type: Function,
      default: returnFalse
    },
    steps: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    value: {
      type: Array,
      required: true
    },
    showNow: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      date: this.value[0] || initTimeDate(),
      showDate: false,
      confirmDisabled: true, // 确认按钮不可点击,
      newDate: ''
    };
  },

  computed: {
    timePrefix: function timePrefix() {
      return this.config.getPrefixCls('time-picker');
    },
    showSeconds: function showSeconds() {
      return !!(this.format || '').match(/s$/);
    },
    showMinutes: function showMinutes() {
      return !!(this.format || '').match(/m/);
    },
    visibleDate: function visibleDate() {
      // TODO
      var date = this.date;
      var month = date.getMonth() + 1;
      var tYear = this.t('el.datepicker.year');
      var tMonth = this.t('el.datepicker.month' + month);
      return '' + date.getFullYear() + tYear + ' ' + tMonth;
    },
    timeSlots: function timeSlots() {
      var _this = this;

      if (!this.value[0]) return [];
      return ['getHours', 'getMinutes', 'getSeconds'].map(function (slot) {
        return _this.date[slot]();
      });
    },
    disabledHMS: function disabledHMS() {
      var _this2 = this;

      var disabledTypes = ['disabledHours', 'disabledMinutes', 'disabledSeconds'];
      if (this.disabledDate === returnFalse || !this.value[0]) {
        var disabled = disabledTypes.reduce(function (obj, type) {
          obj[type] = _this2[type];
          return obj;
        }, {});
        return disabled;
      } else {
        var slots = [24, 60, 60];
        var _disabled = ['Hours', 'Minutes', 'Seconds'].map(function (type) {
          return _this2['disabled' + type];
        });
        var disabledHMS = _disabled.map(function (preDisabled, j) {
          var slot = slots[j];
          var toDisable = preDisabled;

          var _loop = function _loop(i) {
            var hms = _this2.timeSlots.map(function (slot, x) {
              return x === j ? i : slot;
            });
            var testDateTime = mergeDateHMS.apply(undefined, [_this2.date].concat(_toConsumableArray(hms)));
            if (_this2.disabledDate(testDateTime, true)) toDisable.push(i);
          };

          for (var i = 0; i < slot; i += _this2.steps[j] || 1) {
            _loop(i);
          }
          return toDisable.filter(unique);
        });
        return disabledTypes.reduce(function (obj, type, i) {
          obj[type] = disabledHMS[i];
          return obj;
        }, {});
      }
    }
  },
  watch: {
    value: function value(dates) {
      var newVal = dates[0] || initTimeDate();
      newVal = new Date(newVal);
      this.date = newVal;
      this.confirmDisabled = false;
    }
  },
  mounted: function mounted() {
    if (this.$parent && this.$parent.$options.name === 'DatePicker') {
      this.showDate = true;
    }
  },

  methods: {
    handleChange: function handleChange(date) {
      var emit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var newDate = new Date(this.date);
      this.newDate = newDate;
      _Object$keys(date).forEach(function (type) {
        return newDate['set' + capitalize(type)](date[type]);
      });
      if (emit) this.$emit('pick', newDate, true);
    },
    handleConfirm: function handleConfirm() {
      console.log('confirm', this.newDate);
      this.$parent.$parent.$parent.handleOpenChange(false);
    },
    handleSelectNow: function handleSelectNow() {
      var now = new Date();
      _Object$keys(now).forEach(function (type) {
        return now['set' + capitalize(type)](now[type]);
      });
      this.$emit('pick', now, true);
    }
  }
};