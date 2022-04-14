<template>
  <Popper
    tag="div"
    :visible="open"
    @update:visible="handleOpenChange"
    :class="wrapperClasses"
    :placement="placement"
    trigger="click"
    :popper-disabled="disabled"
    :toggle-on-reference-click="false"
    :append-to-container="appendToContainer"
    :get-popup-container="getPopupContainer"
    :popper-options="popperOptions"
    ref="popper"
    :style="width && { width: `${width}px` }"
  >
    <Reference>
      <PickerInput
        :id="elementId"
        :class="[prefix + '-editor']"
        :readonly="type === 'week' || !editable || readonly"
        :disabled="disabled"
        :size="size"
        :placeholder="getPlaceHolder"
        :current-value="visualValue"
        :label="label"
        :name="name"
        clearable-on-readonly
        ref="input"
        :suffix-icon="suffixIcon"
        :invalid="invalid"
        :loading="loading"
        :genre="genre"
        @input="handleInputChange"
        @clear="handleClear"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
        @enter="handleInputEnter"
      >
        <wt-icon
          class="input-icon-suffix"
          v-show="pickerType"
          :name="pickerType"
          :stroke-width="1"
          :width="12"
          :height="12"
          slot="suffix"
        />
      </PickerInput>
    </Reference>
    <Drop :class="popperClass">
      <component
        :is="panel"
        ref="pickerPanel"
        :show-time="type === 'datetime' || type === 'datetimerange'"
        :default-time="defaultTime"
        :show-btn-now="false"
        :confirm="needConfirm"
        :selection-mode="selectionMode"
        :steps="steps"
        :format="format"
        :show-now="showNow"
        :value="internalValue"
        :start-date="startDate"
        :split-panels="splitPanels"
        :show-week-numbers="showWeekNumbers"
        :week-start="weekStart"
        :picker-type="type"
        :multiple="multiple"
        :focused-date="focusedDate"
        :visible="open"
        :time-picker-options="timePickerOptions"
        v-bind="ownPickerProps"
        @pick="onPick"
        @pick-click-now="handleClickNow"
        @pick-success="onPickSuccess"
        @pick-range="hanldePickRange"
        @pick-time-range="handleTimeRange"
        @canel="handleCancel"
        @current-view-change="updatePopper"
      >
        <slot name="shortcuts" slot="shortcuts"></slot>
        <template slot-scope="scope" slot="cell">
          <slot :cell="scope.cell" name="cell">{{ scope.cell.desc }}</slot>
        </template>

        <template slot="confirm" v-if="$slots.confirm">
          <slot name="confirm"></slot>
        </template>
      </component>
    </Drop>
  </Popper>
</template>
<script>
import { CONFIG_PROVIDER, getPrefixCls, getIconCls } from '@/utils/config';
import { Popper, Drop, Reference } from '@components/popper';
import { DEFAULT_FORMATS, RANGE_SEPARATOR, TYPE_VALUE_RESOLVER_MAP } from '@/utils/date';
import { isDate, isString, isArray } from '@/utils/type';
import { hasProps } from '@/utils/vnode';
import { error } from '@/utils/console';

import Input from './input.js';
import PICKER_TYPE_ENUM from './PICKER_TYPE_ENUM';

const isEmptyArray = (val) => {
  return val.reduce((isEmpty, str) => {
    return isEmpty && (!str || (typeof str === 'string' && str.trim() === ''));
  }, true);
};

function eql(a, b) {
  const aValue = JSON.stringify(a);
  const bValue = JSON.stringify(b);
  return (!a && !b) || (aValue === bValue && typeof a === typeof b);
}

function arrayEql(a, b) {
  return (
    a === b ||
    (a &&
      b &&
      a.length === b.length &&
      a.every((v1, i) => {
        const v2 = b[i];
        return (!v1 && !v2) || v1 === v2;
      }))
  );
}

export default {
  components: {
    Popper,
    Drop,
    Reference,
    PickerInput: Input,
  },
  props: {
    // 宽度
    width: Number,
    // 日期格式
    format: {
      type: String,
    },
    // 数值格式
    valueFormat: {
      // 如果没有配置则默认按照当前 value 属性推断
      type: String,
      validator(v) {
        if (v && /w/i.test(v)) {
          error('DatePicker', 'w、W 格式仅 format 属性可用');
          return false;
        }
        return true;
      },
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false,
    },
    // 是否可编辑
    editable: {
      type: Boolean,
      default: true,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: false,
    },
    // 是否默认打开面板
    open: {
      type: Boolean,
      default: null,
    },
    // 是否可多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 时间控件可选项
    timePickerOptions: {
      default: () => ({}),
      type: Object,
    },
    // 是否分割面板
    splitPanels: {
      type: Boolean,
      default: true,
    },
    // 开始日期
    startDate: {
      type: Date,
    },
    // 控件尺寸
    size: {
      type: String,
    },
    // 输入框占位符
    placeholder: {
      type: String,
    },
    // 面板弹出方向
    placement: {
      type: String,
    },
    // 输入框的name属性
    name: {
      type: String,
    },
    // 选择器上方的标签
    label: {
      type: String,
    },
    // 控件值
    value: {
      type: [Date, String, Array, Number],
    },
    // 快捷选项
    options: {
      type: Object,
      default: () => ({}),
    },
    // appendToContainer: {
    //   type: Boolean,
    //   default: true,
    // },
    // getPopupContainer: Function,
    invalid: Boolean,
    loading: Boolean,
    genre: String,
    // showBtnNow: {
    //   type: Boolean,
    //   default: true,
    // },
    popperClass: String,
    defaultTime: {
      type: [Array, String],
    },
    popperOptions: Object,
    formatter: Function,
    // 周起始
    weekStart: {
      type: Number,
      default: 1,
      validator(v) {
        return v >= 0 && v <= 6;
      },
    },
    // 是否展示此刻按钮
    showNow: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      CalendarPicker: this,
    };
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
        getIconCls,
      },
    },
  },
  data() {
    const { value } = this;
    // 不可抽成 computed 属性，computed 在 data 之后赋值
    const isRange = this.type.indexOf('range') > -1;
    const emptyArray = isRange ? [null, null] : [null];
    const initialValue = isEmptyArray((isRange ? value : [value]) || []) ? emptyArray : this.parseDate(value);
    return {
      internalValue: initialValue,
      selectionMode: this.onSelectionModeChange(this.type),
      isFocused: false,
      focusedDate: initialValue[0] || this.startDate || new Date(),
      selecting: false, // 目前仅用在 timerange 中，表示是否在选择中
      pickerType: false, // 判断是日期选择器或时间选择器 time时间 calendar日期
      inputValue: '', // 输入框内容
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('date-picker');
    },
    iconPrefix() {
      return this.config.getIconCls;
    },
    wrapperClasses() {
      return [
        this.prefix,
        {
          [this.prefix + '-focused']: this.isFocused,
        },
      ];
    },
    visualValue() {
      const text = this.formatDate(this.internalValue);
      if (this.formatter) {
        return this.formatter(this.value, text) || '';
      }
      return text;
    },
    publicVModelValue() {
      if (this.multiple) {
        return this.internalValue.slice();
      } else {
        const isRange = this.type.indexOf('range') > -1;
        const val = this.internalValue.map((date) => {
          return isDate(date) ? new Date(date) : date || '';
        });
        return isRange ? val : val[0];
      }
    },
    needConfirm() {
      return this.confirm || ['datetime', 'datetimerange'].indexOf(this.type) > -1 || this.multiple;
    },
    suffixIcon() {
      return hasProps(this, 'icon')
        ? this.icon
        : ['time', 'timerange'].indexOf(this.type) > -1
          ? this.getPickerType('time')
          : this.getPickerType('calendar');
    },
    shouldFormatValue() {
      return isArray(this.value) ? isString(this.value[0]) : isString(this.value);
    },
    getPlaceHolder() {
      if (this.placeholder) {
        return this.placeholder;
      } else if (this.type === 'date') {
        return PICKER_TYPE_ENUM.date;
      } else if (this.type === 'month') {
        return PICKER_TYPE_ENUM.month;
      } else if (this.type === 'year') {
        return PICKER_TYPE_ENUM.year;
      } else if (this.type === 'time') {
        return PICKER_TYPE_ENUM.time;
      } else if (this.type === 'timerange') {
        return PICKER_TYPE_ENUM.timerange;
      } else {
        return 'Select';
      }
    },
  },
  watch: {
    value(val) {
      this.internalValue = this.parseDate(val);
    },
    type(type) {
      this.onSelectionModeChange(type);
    },
    publicVModelValue(now, before) {
      if (this.selecting) {
        return;
      }
      const arrayValue = isArray(now) ? now : [now];
      const parseValues = this.parseDate(this.value);
      const shouldEmitInput =
        !arrayEql(arrayValue, parseValues) &&
        !eql(now, this.value) &&
        !eql(arrayValue, parseValues) &&
        !eql(now, before);

      if (shouldEmitInput) {
        const inputValue = this.formatToInput(now);
        this.$emit('input', inputValue);
        this.$emit('change', inputValue);
      }
    },
    selecting(now, before) {
      if (before && !now) {
        const parseValues = this.parseDate(this.value);
        const shouldEmitInput = !arrayEql(this.internalValue, parseValues);
        if (shouldEmitInput) {
          const sortedDates = this.publicVModelValue.sort((a, b) => a.getTime() - b.getTime());
          const inputValue = this.formatToInput(sortedDates);
          this.$emit('input', inputValue);
          this.$emit('change', inputValue);
        }
      }
    },
    open(now, old) {
      if (now) {
        this.onSelectionModeChange(this.type);
        this.reset();
      }
    },
  },
  mounted() {
    this.$on('focus-input', () => this.focus());
  },
  methods: {
    // 日期格式填入输入框
    formatToInput(date) {
      const isRange = this.type.indexOf('range') > -1;
      if (isArray(this.value) || this.multiple || isRange) {
        return (date || []).map(this.formatValue).filter((d) => (this.valueFormat ? !!d : d !== undefined));
      }
      return this.formatValue(date);
    },
    // 日期值格式
    formatValue(date) {
      if (this.valueFormat === 'timestamp') {
        return date ? date.getTime() : undefined;
      } else if (this.valueFormat || this.shouldFormatValue) {
        return this.formatDate(date, this.valueFormat || this.format);
      } else {
        return date || undefined;
      }
    },
    // 面板打开与关闭
    handleOpenChange(v) {
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
    // 输入框聚焦
    handleInputFocus() {
      this.isFocused = true;
    },
    // 输入框失焦
    handleInputBlur() {
      this.isFocused = false;
    },
    // 输入框输入
    handleInputEnter() {
      if (this.internalValue.length !== 0 && this.internalValue[0] !== null) {
        this.handleOpenChange(true);
        const that = this;
        setTimeout(function () {
          that.handleOpenChange(false);
        }, 1250);
      }
    },
    // 选择模式切换 年/月/日
    onSelectionModeChange(type) {
      if (this.readonly || this.disabled) {
        return;
      }
      if (type.match(/^date/) || type.match(/^week/)) type = 'date';
      if (type.match(/^month/)) type = 'month';
      if (type.match(/^year/)) type = 'year';
      if (['year', 'month', 'date', 'time'].indexOf(type) > -1) {
        this.selectionMode = type;
      }
      this.$nextTick(this.updatePopper);
      return this.selectionMode;
    },
    // 重置
    reset() {
      this.$refs.pickerPanel && this.$refs.pickerPanel.reset && this.$refs.pickerPanel.reset();
    },
    // 输入框输入
    handleInputChange(newValue) {
      this.inputValue = newValue;
      // const isArrayValue = this.type.indexOf('range') > -1 || this.multiple;
      const oldValue = this.formatDate(this.internalValue);
      const newDate = this.parseDate(newValue, true);
      const disabledDateFn =
        this.options && typeof this.options.disabledDate === 'function' && this.options.disabledDate;
      // const valueToTest = isArrayValue ? newDate : newDate[0];
      const isValidDate = newDate.reduce((valid, date) => {
        return valid && date instanceof Date && !isNaN(date.getTime());
      }, true);
      if (!isValidDate) {
        return;
      }

      const isDisabled = disabledDateFn && newDate.some(disabledDateFn);
      if (newValue !== oldValue && !isDisabled) {
        this.internalValue = newDate.sort((a, b) => a.getTime() - b.getTime());
      }
    },
    // 点击“此刻”
    handleClickNow() {
      const dates = this.multiple ? new Date() : this.internalValue.map(() => new Date());
      this.$emit('click-now');
      this.onPick(dates);
      this.handleOpenChange(false);
      // this.reset();
    },
    // 清空输入框
    handleClear() {
      this.$emit('clear');
      this.internalValue = this.internalValue.map(() => '');
    },
    // 选择数值后
    hanldePickRange(rangeState) {
      this.$emit('pick-range', rangeState);
    },
    // 格式化 val 为 Date[]
    // 当为输入框手动输入内容时，将强制使用 format 进行格式化
    parseDate(val, forceFormat) {
      // 假设这里的val为120000130000
      const { type, valueFormat } = this;
      const isRange = this.type.indexOf('range') > -1;

      if (!forceFormat && valueFormat === 'timestamp') {
        if (isRange && (!val || !val.length)) {
          val = [null, null];
        } else if (!isArray(val)) {
          val = [val];
        }
        return val.map((v) => (v ? new Date(parseInt(v)) : v));
      }

      const parser = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default']).parser;
      const format = this.valueFormat || this.format || DEFAULT_FORMATS[type];
      const multipleParser = TYPE_VALUE_RESOLVER_MAP['multiple'].parser;

      if (this.multiple && val) {
        val = multipleParser(val, format);
      } else if (isRange) {
        if (!val) {
          val = [null, null];
        } else {
          if (typeof val === 'string') {
            val = parser(val, format);
          } else {
            const [start, end] = val;
            if (!start || !end) {
              val = [null, null];
            } else if (isDate(start) && isDate(end)) {
              val = val.map((date) => new Date(date));
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
    // 日期格式
    formatDate(value, format = this.format) {
      const defaultFormat = DEFAULT_FORMATS[this.type];
      if (this.multiple) {
        const formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter;
        return formatter(isArray(value) ? value : [value], format || defaultFormat, { weekStart: this.weekStart });
      } else {
        const { formatter } = TYPE_VALUE_RESOLVER_MAP[this.type] || TYPE_VALUE_RESOLVER_MAP['default'];
        return formatter(value, format || defaultFormat, { weekStart: this.weekStart });
      }
    },
    // 选择日期
    onPick(dates, visible = false) {
      // 若是时间段则排序
      if (isArray(dates)) {
        dates = dates.sort((a, b) => a.getTime() - b.getTime());
      }
      if (this.multiple) {
        const pickedTimeStamp = dates.getTime();
        const indexOfPickedDate = this.internalValue.findIndex((date) => {
          return date && date.getTime() === pickedTimeStamp;
        });
        const allDates = [...this.internalValue, dates].filter(Boolean);
        const timeStamps = allDates
          .map((date) => date.getTime())
          .filter((ts, i, arr) => {
            return arr.indexOf(ts) === i && i !== indexOfPickedDate;
          }); // filter away duplicates
        this.internalValue = timeStamps.map((ts) => new Date(ts));
      } else {
        this.internalValue = Array.isArray(dates) ? dates : [dates];
      }

      if (this.internalValue[0]) {
        this.focusedDate = this.multiple
          ? this.internalValue[this.internalValue.length - 1] || this.internalValue[0]
          : this.internalValue[0];
      }

      // reset the selectionMode
      if (!this.needConfirm) {
        this.onSelectionModeChange(this.type);
        if (this.open !== visible) {
          this.handleOpenChange(visible);
        }
      }
    },
    // 选择成功
    onPickSuccess() {
      this.$emit('confirm');
      this.handleOpenChange(false);
      this.reset();
    },
    handleTimeRange(value) {
      this.selecting = true;
      this.internalValue = value;
    },
    // 取消选择
    handleCancel() {
      this.internalValue = this.parseDate(this.value);
      this.handleOpenChange(false);
    },
    // 聚焦
    focus() {
      if (this.editable) {
        this.$refs.input.focus();
      }
      this.handleOpenChange(true);
    },
    // 失焦
    blur() {
      this.$refs.input.blur();
      this.handleOpenChange(false);
    },
    // 更新弹出层
    updatePopper() {
      this.$nextTick(() => {
        const { open } = this;
        if (open) {
          const { popper } = this.$refs;
          popper.updatePopper();
        }
      });
    },
    // 获取选择类型
    getPickerType(pickerType) {
      if (pickerType === 'calendar') {
        this.pickerType = 'calendar';
      } else if (pickerType === 'time') {
        this.pickerType = 'clock';
      }
    },
  },
};
</script>
