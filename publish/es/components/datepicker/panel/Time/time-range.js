import _Object$keys from 'babel-runtime/core-js/object/keys';
import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import TimeSpinner from '../../base/time-spinner';
import Confirm from '../../base/confirm';
import Options from '../../time-mixins';

import Mixin from '../panel-mixin';
import Locale from '@wish/wt-vue/es/mixins/locale';

import { initTimeDate } from '@wish/wt-vue/es/utils/date';

var capitalize = function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
};

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes, on: { "mousedown": function mousedown($event) {
        $event.preventDefault();
      } } }, [_c('div', { class: [_vm.panelPrefix + '-body', _vm.panelPrefix + '-multiple-body'] }, [_c('div', { class: [_vm.panelPrefix + '-content', _vm.panelPrefix + '-multiple-content', _vm.panelPrefix + '-content-left'] }, [_c('div', { class: [_vm.timePrefix + '-header', _vm.timePrefix + '-multiple-header'] }, [[_vm._v(_vm._s(_vm.t('el.datepicker.startTime')))]], 2), _vm._v(" "), _c('time-spinner', { ref: "timeSpinner", attrs: { "steps": _vm.steps, "show-seconds": _vm.showSeconds, "show-minutes": _vm.showMinutes, "hours": _vm.dateStart && _vm.dateStart.getHours(), "minutes": _vm.dateStart && _vm.dateStart.getMinutes(), "seconds": _vm.dateStart && _vm.dateStart.getSeconds(), "disabled-hours": _vm.disabledHours, "disabled-minutes": _vm.disabledMinutes, "disabled-seconds": _vm.disabledSeconds, "hide-disabled-options": _vm.hideDisabledOptions }, on: { "change": _vm.handleStartChange } })], 1), _vm._v(" "), _c('div', { class: [_vm.panelPrefix + '-content', _vm.panelPrefix + '-multiple-content', _vm.panelPrefix + '-content-right'] }, [_c('div', { class: [_vm.timePrefix + '-header', _vm.timePrefix + '-multiple-header'] }, [[_vm._v(_vm._s(_vm.t('el.datepicker.endTime')))]], 2), _vm._v(" "), _c('time-spinner', { ref: "timeSpinnerEnd", attrs: { "steps": _vm.steps, "show-seconds": _vm.showSeconds, "show-minutes": _vm.showMinutes, "hours": _vm.dateEnd && _vm.dateEnd.getHours(), "minutes": _vm.dateEnd && _vm.dateEnd.getMinutes(), "seconds": _vm.dateEnd && _vm.dateEnd.getSeconds(), "disabled-hours": _vm.disabledHours, "disabled-minutes": _vm.disabledMinutes, "disabled-seconds": _vm.disabledSeconds, "hide-disabled-options": _vm.hideDisabledOptions }, on: { "change": _vm.handleEndChange } })], 1), _vm._v(" "), _vm.confirm ? _c('Confirm', { attrs: { "show-btn-now": _vm.showBtnNow }, on: { "click-now": _vm.handlePickClickNow, "confirm": _vm.handlePickSuccess } }) : _vm._e()], 1), _vm._v(" "), _c('div', { class: [_vm.panelPrefix + '-footer'] }, [_c('span'), _vm._v(" "), _c('wt-button', { class: !_vm.confirmDisabled ? 'btn' : 'btn disabled', attrs: { "type": "primary", "disabled": _vm.confirmDisabled }, on: { "click": _vm.handleConfirm } }, [_vm._v("\n        确认\n      ")])], 1)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'RangeTimePickerPanel',
  components: { TimeSpinner: TimeSpinner, Confirm: Confirm },
  mixins: [Mixin, Locale, Options],
  props: {
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
    }
  },
  data: function data() {
    return {
      dateStart: undefined,
      dateEnd: undefined,
      confirmDisabled: true // 确认按钮不可点击,
    };
  },

  computed: {
    timePrefix: function timePrefix() {
      return this.config.getPrefixCls('time-picker');
    },
    classes: function classes() {
      var panelPrefix = this.panelPrefix,
          timePrefix = this.timePrefix;

      return [panelPrefix + '-body-wrapper', timePrefix + '-with-range', _defineProperty({}, timePrefix + '-with-seconds', this.showSeconds)];
    },
    showSeconds: function showSeconds() {
      return !!(this.format || '').match(/s$/);
    },
    showMinutes: function showMinutes() {
      return !!(this.format || '').match(/m/);
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler(dates) {
        this.setDates(dates);
        console.log('dates', dates[0]);
        if (dates.length === 2 && dates[0] !== null && dates[1] !== null) {
          this.confirmDisabled = false;
        } else {
          this.confirmDisabled = true;
        }
      }
    }
  },
  methods: {
    setDates: function setDates(dates) {
      var _dates$slice = dates.slice(),
          _dates$slice2 = _slicedToArray(_dates$slice, 2),
          dateStart = _dates$slice2[0],
          dateEnd = _dates$slice2[1];

      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
    },
    handleConfirm: function handleConfirm() {
      this.$emit('pick-success', [this.dateStart, this.dateEnd]);
    },
    handleCancel: function handleCancel() {
      this.setDates(this.value);
      this.$emit('canel');
    },
    handleChange: function handleChange(start, end) {
      console.log('handleChange');
      this.confirmDisabled = false;
      var dateStart = new Date(this.dateStart || initTimeDate());
      var dateEnd = new Date(this.dateEnd || initTimeDate());

      // set dateStart
      _Object$keys(start).forEach(function (type) {
        dateStart['set' + capitalize(type)](start[type]);
      });

      // set dateEnd
      _Object$keys(end).forEach(function (type) {
        dateEnd['set' + capitalize(type)](end[type]);
      });
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
      this.$emit('pick-time-range', [dateStart, dateEnd]);
    },
    handleStartChange: function handleStartChange(date) {
      this.handleChange(date, {});
    },
    handleEndChange: function handleEndChange(date) {
      this.handleChange({}, date);
    },
    updateScroll: function updateScroll() {
      this.$refs.timeSpinner.updateScroll();
      this.$refs.timeSpinnerEnd.updateScroll();
    }
  }
};