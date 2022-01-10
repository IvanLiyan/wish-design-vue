<template>
  <div :class="classes" @mousedown.prevent>
    <div :class="[panelPrefix + '-sidebar']" v-if="shortcuts.length || $slots.shortcuts">
      <slot name="shortcuts">
        <div :class="[panelPrefix + '-shortcut']"
          v-for="shortcut in shortcuts"
          :key="shortcut.text"
          @click="handleShortcutClick(shortcut)">{{ shortcut.text }}</div>
      </slot>
    </div>
    <div :class="[panelPrefix + '-body']">
      <div :class="`${prefix}-time-header`" v-if="showTime">
        <picker-input :current-value="visibleDate"
          size="small" />
        <time-picker
          ref="timePicker"
          size="small"
          icon=""
          v-bind="timePickerOptions"
          :value="visibleTime"
          :open.sync="openTime"
          placement="bottom-end"
          :time-disabled="timeDisabled"
          @input="hanldeTimeChange"
          :append-to-container="false"
        />
      </div>
      <div :class="[prefix + '-header']" v-show="currentView !== 'time'">
        <span
          :class="iconBtnCls('prev', '-double')"
          @click="changeYear(-1)">
          <Icon name="chevrons-left" />
        </span>
        <span
          v-if="pickerTable === 'date-table'"
          :class="iconBtnCls('prev')"
          @click="changeMonth(-1)"
          v-show="currentView === 'date'">
          <Icon name="chevron-left" />
        </span>
        <date-panel-label
          :date-panel-label="datePanelLabel"
          :current-view="pickerTable.split('-').shift()"
          :date-prefix-cls="prefix" />
        <span
          :class="iconBtnCls('next', '-double')"
          @click="changeYear(+1)">
          <Icon name="chevrons-right" />
        </span>
        <span
          v-if="pickerTable === 'date-table'"
          :class="iconBtnCls('next')"
          @click="changeMonth(+1)"
          v-show="currentView === 'date'">
            <Icon name="chevron-right" />
        </span>
      </div>
      <div :class="[panelPrefix + '-content']">
        <component
          :is="pickerTable"
          ref="pickerTable"
          v-if="currentView !== 'time'"
          :table-date="panelDate"
          :show-week-numbers="isWeek || showWeekNumbers"
          :is-week="isWeek"
          :value="dates"
          :selection-mode="isWeek ? 'week' : selectionMode"
          :disabled-date="disabledDate"
          :focused-date="focusedDate"
          :range-state="rangeState"
          :week-start="weekStart"
          @pick="panelPickerHandlers"
          @change-range="handleChangeRange"
        >
          <template slot-scope="scope" slot="cell">
            <slot :cell="scope.cell" name="cell"></slot>
          </template>
        </component>
      </div>
      <Confirm
        v-if="confirm"
        :show-time="showTime"
        :show-btn-now="showBtnNow"
        @click-now="handlePickClickNow"
        @confirm="handlePickSuccess"
      >
        <template slot v-if="$slots.confirm">
          <slot name="confirm"></slot>
        </template>
      </Confirm>
    </div>
  </div>
</template>
<script>
import DateTable from '../../base/date-table.vue';
import YearTable from '../../base/year-table.vue';
import MonthTable from '../../base/month-table.vue';
import TimePicker from '@components/timepicker';
import Confirm from '../../base/confirm.vue';
import datePanelLabel from './date-panel-label.vue';
import PickerInput from '../../input.js';
import Mixin from '../panel-mixin';
import DateMixin from './date-panel-mixin';
import Locale from '@/mixins/locale';
import Icon from '@components/icon';

import {
  DEFAULT_FORMATS,
  TYPE_VALUE_RESOLVER_MAP,
  siblingMonth,
  formatDateLabels,
} from '@/utils/date';

export default {
  name: 'DatePickerPanel',
  components: {
    DateTable,
    YearTable,
    MonthTable,
    TimePicker,
    datePanelLabel,
    Confirm,
    PickerInput,
    Icon,
  },
  mixins: [ Mixin, Locale, DateMixin ],
  inheritAttrs: false,
  props: {
    // more props in the mixin
    multiple: {
      type: Boolean,
      default: false,
    },
    defaultTime: {
      type: String,
    },
  },
  data () {
    const {selectionMode, value} = this;

    const dates = value.slice().sort();
    return {
      currentView: selectionMode || 'date',
      pickerTable: this.getTableType(selectionMode),
      dates: dates,
      panelDate: this.startDate || dates[0] || new Date(),
      openTime: false,
      rangeState: {},
    };
  },
  computed: {
    isWeek () {
      return this.pickerType === 'week';
    },
    classes () {
      const { panelPrefix } = this;
      return [
        `${panelPrefix}-body-wrapper`,
        {
          [`${panelPrefix}-with-sidebar`]: this.shortcuts.length,
        },
      ];
    },
    panelPickerHandlers () {
      return this.pickerTable === `${this.currentView}-table` ? this.handlePick
        : this.handlePreSelection;
    },
    datePanelLabel () {
      const locale = this.t('el.locale');
      const datePanelLabel = this.t('el.datepicker.datePanelLabel');
      const date = this.panelDate;
      const { labels, separator } = formatDateLabels(
        locale,
        datePanelLabel,
        date,
      );

      const handler = (type) => {
        return () => {
          this.pickerTable = this.getTableType(type); // eslint-disable-line
          return this.pickerTable;
        };
      };

      return {
        separator: separator,
        labels: labels.map((obj) => {
          obj.handler = handler(obj.type);
          return obj;
        }),
      };
    },
    timeDisabled () {
      return !this.dates[0];
    },
    visibleTime () {
      return this.dates[0];
    },

    visibleDate () {
      return this.formatDate(this.value, 'date');
    },
  },
  watch: {
    value (newVal) {
      this.handleValueChange(newVal);
    },
    currentView () {
      if (this.currentView === 'time') {
        this.$nextTick(() => {
          const spinner = this.$refs.timePicker.$refs.timeSpinner;
          spinner.updateScroll();
        });
      }
    },
    selectionMode (type) {
      this.currentView = type;
      this.pickerTable = this.getTableType(type);
    },
    focusedDate (date) {
      const isDifferentYear = date.getFullYear() !==
        this.panelDate.getFullYear();
      const isDifferentMonth = isDifferentYear ||
        date.getMonth() !== this.panelDate.getMonth();
      if (isDifferentYear || isDifferentMonth) {
        this.panelDate = date;
      }
    },
    visible (v) {
      if (!v) {
        this.handleValueChange(this.value);
      }
    },
    pickerTable () {
      this.$emit('current-view-change');
    },
  },
  methods: {
    handleValueChange (newVal) {
      this.dates = newVal;
      this.panelDate = this.startDate || (this.multiple
        ? this.dates[this.dates.length - 1] : this.dates[0]) || new Date();
      this.rangeState = {};
    },
    reset () {
      this.currentView = this.selectionMode;
      this.pickerTable = this.getTableType(this.currentView);
    },
    changeYear (dir) {
      if (this.selectionMode === 'year' || this.pickerTable === 'year-table') {
        this.panelDate = new Date(
          this.panelDate.getFullYear() + dir * 10,
          0,
          1,
        );
      } else {
        this.panelDate = siblingMonth(this.panelDate, dir * 12);
      }
    },
    getTableType (currentView) {
      return currentView.match(/^time/) ? 'time-picker'
        : `${currentView}-table`;
    },
    changeMonth (dir) {
      this.panelDate = siblingMonth(this.panelDate, dir);
    },
    handlePreSelection (value) {
      this.panelDate = value;
      if (this.pickerTable === 'year-table') this.pickerTable = 'month-table';
      else this.pickerTable = this.getTableType(this.currentView);
    },
    handlePick (value, type) {
      const { selectionMode, panelDate, defaultTime } = this;
      if (selectionMode === 'year') value = new Date(value.getFullYear(), 0, 1);
      else if (selectionMode === 'month') {
        value = new Date(
          panelDate.getFullYear(),
          value.getMonth(), 1,
        );
      } else {
        value = new Date(value);
        if (defaultTime) {
          const defaultTimes = defaultTime.split(':');
          const hours = defaultTimes[0];
          const mins = defaultTimes[1];
          const sec = defaultTimes[2];
          value.setHours(hours, mins, sec);
        }
      }

      if (this.pickerType === 'datetime') {
        const current = this.dates[0];
        const defaultTimes = (defaultTime || '0:0:0').split(':');
        const hours = current ? current.getHours() : defaultTimes[0];
        const mins = current ? current.getMinutes() : defaultTimes[1];
        const sec = current ? current.getSeconds() : defaultTimes[2];
        value.setHours(hours, mins, sec);
      }

      this.dates = [value];
      this.$emit('pick', value, false);
    },

    hanldeTimeChange (time) {
      const hours = time ? time.getHours() : 0;
      const mins = time ? time.getMinutes() : 0;
      const sec = time ? time.getSeconds() : 0;
      const d = new Date(this.visibleTime);
      d.setHours(hours, mins, sec);
      this.$emit('pick', d, false);
    },

    formatDate (value, type) {
      let format = this.format;
      if (format) {
        format = format.split(' ')[0];
      }

      format = format || DEFAULT_FORMATS[type];
      const { formatter } = (
        TYPE_VALUE_RESOLVER_MAP[type] ||
        TYPE_VALUE_RESOLVER_MAP['default']
      );
      return formatter(value, format);
    },
    handleChangeRange (val) {
      if (val && this.visible) {
        this.rangeState = {
          from: val,
          to: val,
        };
      }
    },
  },
};
</script>
