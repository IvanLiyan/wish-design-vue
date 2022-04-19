import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import Options from '../time-mixins';
import { deepCopy, firstUpperCase, scrollTop } from '@wish/wt-vue/es/utils/util';
import { isNaN } from '@wish/wt-vue/es/utils/type';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var timeParts = ['hours', 'minutes', 'seconds'];

function getFirstEnableCell(cells) {
  return cells.find(function (cell) {
    return !cell.disabled;
  });
}

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_c('div', { ref: "hours", class: [_vm.prefixCls + '-list'] }, [_c('ul', { class: [_vm.prefixCls + '-ul'] }, _vm._l(_vm.hoursList, function (item, i) {
    return _c('li', { directives: [{ name: "show", rawName: "v-show", value: !item.hide, expression: "!item.hide" }], key: i, class: _vm.getCellCls(item), on: { "click": function click($event) {
          return _vm.handleClick('hours', item);
        } } }, [_vm._v(_vm._s(_vm.formatTime(item.text)))]);
  }), 0)]), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showMinutes, expression: "showMinutes" }], ref: "minutes", class: [_vm.prefixCls + '-list'] }, [_c('ul', { class: [_vm.prefixCls + '-ul'] }, _vm._l(_vm.minutesList, function (item, i) {
    return _c('li', { directives: [{ name: "show", rawName: "v-show", value: !item.hide, expression: "!item.hide" }], key: i, class: _vm.getCellCls(item), on: { "click": function click($event) {
          return _vm.handleClick('minutes', item);
        } } }, [_vm._v(_vm._s(_vm.formatTime(item.text)))]);
  }), 0)]), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showSeconds, expression: "showSeconds" }], ref: "seconds", class: [_vm.prefixCls + '-list'] }, [_c('ul', { class: [_vm.prefixCls + '-ul'] }, _vm._l(_vm.secondsList, function (item, i) {
    return _c('li', { directives: [{ name: "show", rawName: "v-show", value: !item.hide, expression: "!item.hide" }], key: i, class: _vm.getCellCls(item), on: { "click": function click($event) {
          return _vm.handleClick('seconds', item);
        } } }, [_vm._v(_vm._s(_vm.formatTime(item.text)))]);
  }), 0)])]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'TimeSpinner',
  mixins: [Options],
  props: {
    // 小时
    hours: {
      type: [Number, String],
      default: NaN
    },
    // 分钟
    minutes: {
      type: [Number, String],
      default: NaN
    },
    // 秒
    seconds: {
      type: [Number, String],
      default: NaN
    },
    // 是否显示秒
    showSeconds: {
      type: Boolean,
      default: true
    },
    // 是否显示分钟
    showMinutes: {
      type: Boolean,
      default: true
    },
    steps: {
      type: Array,
      default: function _default() {
        return [];
      }
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
  data: function data() {
    var _this = this;

    return {
      spinerSteps: [1, 1, 1].map(function (one, i) {
        return Math.abs(_this.steps[i]) || one;
      }),
      compiled: false,
      focusedColumn: -1, // which column inside the picker
      focusedTime: [0, 0, 0] // the values array into [hh, mm, ss]
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('time-picker');
    },
    prefixCls: function prefixCls() {
      return this.prefix + '-cells';
    },
    classes: function classes() {
      var _ref;

      var prefixCls = this.prefixCls;

      return ['' + prefixCls, (_ref = {}, _defineProperty(_ref, prefixCls + '-with-seconds', this.showSeconds), _defineProperty(_ref, prefixCls + '-with-minutes', this.showMinutes), _ref)];
    },
    hoursList: function hoursList() {
      var hours = [];
      var step = this.spinerSteps[0];
      var focusedHour = this.focusedColumn === 0 && this.focusedTime[0];
      var hourTmpl = {
        text: 0,
        selected: false,
        disabled: false,
        hide: false
      };

      for (var i = 0; i < 24; i += step) {
        var hour = deepCopy(hourTmpl);
        hour.text = i;
        hour.focused = i === focusedHour;

        if (this.disabledHours.length && this.disabledHours.indexOf(i) > -1) {
          hour.disabled = true;
          if (this.hideDisabledOptions) hour.hide = true;
        }
        if (this.hours === i) hour.selected = true;
        hours.push(hour);
      }

      return hours;
    },
    minutesList: function minutesList() {
      var minutes = [];
      var step = this.spinerSteps[1];
      var focusedMinute = this.focusedColumn === 1 && this.focusedTime[1];
      var minuteTmpl = {
        text: 0,
        selected: false,
        disabled: false,
        hide: false
      };

      for (var i = 0; i < 60; i += step) {
        var minute = deepCopy(minuteTmpl);
        minute.text = i;
        minute.focused = i === focusedMinute;

        if (this.disabledMinutes.length && this.disabledMinutes.indexOf(i) > -1) {
          minute.disabled = true;
          if (this.hideDisabledOptions) minute.hide = true;
        }
        if (this.minutes === i) minute.selected = true;
        minutes.push(minute);
      }
      return minutes;
    },
    secondsList: function secondsList() {
      var seconds = [];
      var step = this.spinerSteps[2];
      var focusedMinute = this.focusedColumn === 2 && this.focusedTime[2];
      var secondTmpl = {
        text: 0,
        selected: false,
        disabled: false,
        hide: false
      };

      for (var i = 0; i < 60; i += step) {
        var second = deepCopy(secondTmpl);
        second.text = i;
        second.focused = i === focusedMinute;

        if (this.disabledSeconds.length && this.disabledSeconds.indexOf(i) > -1) {
          second.disabled = true;
          if (this.hideDisabledOptions) second.hide = true;
        }
        if (this.seconds === i) second.selected = true;
        seconds.push(second);
      }

      return seconds;
    }
  },
  watch: {
    hours: function hours(val) {
      if (!this.compiled) return;
      this.scroll('hours', this.hoursList.findIndex(function (obj) {
        return parseInt(obj.text) === val;
      }));
    },
    minutes: function minutes(val) {
      if (!this.compiled) return;
      this.scroll('minutes', this.minutesList.findIndex(function (obj) {
        return parseInt(obj.text) === val;
      }));
    },
    seconds: function seconds(val) {
      if (!this.compiled) return;
      this.scroll('seconds', this.secondsList.findIndex(function (obj) {
        return parseInt(obj.text) === val;
      }));
    },
    focusedTime: function focusedTime(updated, old) {
      var _this2 = this;

      timeParts.forEach(function (part, i) {
        if (updated[i] === old[i] || typeof updated[i] === 'undefined') return;
        var valueIndex = _this2[part + 'List'].findIndex(function (obj) {
          return obj.text === updated[i];
        });
        _this2.scroll(part, valueIndex);
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.compiled = true;_this3.updateScroll();
    });
  },

  methods: {
    getCellCls: function getCellCls(cell) {
      var _ref2;

      var prefixCls = this.prefixCls;

      return [prefixCls + '-cell', (_ref2 = {}, _defineProperty(_ref2, prefixCls + '-cell-selected', cell.selected), _defineProperty(_ref2, prefixCls + '-cell-focused', cell.focused), _defineProperty(_ref2, prefixCls + '-cell-disabled', cell.disabled), _ref2)];
    },

    // 选择值后重新计算
    chooseValue: function chooseValue(values) {
      var _this4 = this;

      var changes = timeParts.reduce(function (obj, part, i) {
        var value = values[i];
        if (_this4[part] === value) return obj;
        return _extends({}, obj, _defineProperty({}, part, value));
      }, {});
      if (_Object$keys(changes).length > 0) {
        this.emitChange(changes);
      }
    },

    // 点击对应时分秒
    handleClick: function handleClick(type, cell) {
      if (cell.disabled) return;
      var data = {};
      var items = [['hours', this.hours, this.hoursList], ['minutes', this.minutes, this.minutesList], ['seconds', this.seconds, this.secondsList]];
      items.forEach(function (item) {
        var _item = _slicedToArray(item, 3),
            t = _item[0],
            value = _item[1],
            list = _item[2];

        if (isNaN(value)) {
          var i = getFirstEnableCell(list);
          var v = i ? i.text : value;
          if (!isNaN(v)) {
            data[t] = v;
          }
        }
      });
      data[type] = cell.text;
      this.emitChange(data);
    },
    emitChange: function emitChange(changes) {
      this.$emit('change', changes);
      this.$emit('pick-click');
    },

    // 滚动切换时分秒
    scroll: function scroll(type, index) {
      var from = this.$refs[type].scrollTop;
      var to = 30 * this.getScrollIndex(type, index);
      scrollTop(this.$refs[type], from, to, 500);
    },
    getScrollIndex: function getScrollIndex(type, index) {
      var Type = firstUpperCase(type);
      var disabled = this['disabled' + Type];
      if (disabled.length && this.hideDisabledOptions) {
        var _count = 0;
        disabled.forEach(function (item) {
          return item <= index ? _count++ : '';
        });
        index -= _count;
      }
      return index;
    },
    updateScroll: function updateScroll() {
      var _this5 = this;

      this.$nextTick(function () {
        timeParts.forEach(function (type) {
          _this5.$refs[type].scrollTop = 30 * _this5[type + 'List'].findIndex(function (obj) {
            return parseInt(obj.text) === _this5[type];
          });
        });
      });
    },
    formatTime: function formatTime(text) {
      return text < 10 ? '0' + text : text;
    },
    updateFocusedTime: function updateFocusedTime(col, time) {
      this.focusedColumn = col;
      this.focusedTime = time.slice();
    }
  }
};