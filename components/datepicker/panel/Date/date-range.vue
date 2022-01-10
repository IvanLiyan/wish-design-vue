<template>
  <div :class="classes" @mousedown.prevent>
    <div :class="[panelPrefix + '-sidebar']" v-if="shortcuts.length || $slots.shortcuts">
      <slot name="shortcuts">
        <div :class="[panelPrefix + '-shortcut']"
          v-for="shortcut in shortcuts" :key="shortcut.text"
          @click="handleShortcutClick(shortcut)">{{ shortcut.text }}</div>
      </slot>
    </div>
    <div :class="panelBodyClasses">
      <div :class="[panelPrefix + '-content', panelPrefix + '-content-left']">
        <div :class="`${prefix}-time-header`" v-if="showTime">
          <picker-input :current-value="leftInput"
            size="small" />
          <time-picker
            ref="timePicker"
            v-bind="timePickerOptions"
            size="small"
            icon=""
            :value="leftTime"
            :open.sync="openLeftTime"
            placement="bottom-end"
            :disabled="timeDisabled"
            @input="hanldeLeftTimeChange"
            :append-to-container="false"
          />
        </div>
        <div :class="[prefix + '-header']">
          <span :class="iconBtnCls('prev', '-double')"
            @click="prevYear('left')">
            <Icon name="chevrons-left" />
          </span>
          <span v-if="leftPickerTable === 'date-table'"
            :class="iconBtnCls('prev')"
            @click="prevMonth('left')"
            v-show="currentView === 'date'">
            <Icon name="chevron-left" />
          </span>
          <date-panel-label
            :date-panel-label="leftDatePanelLabel"
            :current-view="leftDatePanelView"
            :date-prefix-cls="prefix" />
          <span
            v-if="splitPanels || currentView !== leftPickerTable.split('-')[0]"
            :class="iconBtnCls('next', '-double')"
            @click="nextYear('left')">
            <Icon name="chevrons-right" />
          </span>
          <span
            v-if="splitPanels && leftPickerTable === 'date-table'"
            :class="iconBtnCls('next')"
            @click="nextMonth('left')"
            v-show="currentView === 'date'">
            <Icon name="chevron-right" />
          </span>
        </div>
        <component
          :is="leftPickerTable"
          ref="leftYearTable"
          :table-date="leftPanelDate"
          selection-mode="range"
          :disabled-date="disabledDate"
          :range-state="rangeState"
          :show-week-numbers="isWeek || showWeekNumbers"
          :is-week="isWeek"
          :value="preSelecting.left ? [dates[0]] : dates"
          :focused-date="focusedDate"
          :picker-type="pickerType"
          :week-start="weekStart"
          @change-range="handleChangeRange"
          @pick="panelPickerHandlers.left"
        >
          <template slot-scope="scope" slot="cell">
            <slot :cell="scope.cell" name="cell"></slot>
          </template>
      </component>
      </div><div
        :class="[`${panelPrefix}-content`, `${panelPrefix}-content-right`]">
        <div :class="`${prefix}-time-header`" v-if="showTime">
          <picker-input :current-value="rightInput"
            size="small" />
          <time-picker
            ref="timePicker"
            v-bind="timePickerOptions"
            size="small"
            :value="rightTime"
            :open.sync="openRightTime"
            placement="bottom-end"
            :disabled="timeDisabled"
            @input="hanldeRightTimeChange"
           :append-to-container="false"
          />
        </div>
        <div :class="[prefix + '-header']">
            <span
              v-if="splitPanels || currentView !== rightPickerTable.split('-')[0]"
              :class="iconBtnCls('prev', '-double')"
              @click="prevYear('right')">
              <Icon name="chevrons-left" />
            </span>
            <span
              v-if="splitPanels && rightPickerTable === 'date-table'"
              :class="iconBtnCls('prev')"
              @click="prevMonth('right')"
              v-show="currentView === 'date'">
              <Icon name="chevron-left" />
            </span>
            <date-panel-label
              :date-panel-label="rightDatePanelLabel"
              :current-view="rightDatePanelView"
              :date-prefix-cls="prefix" />
            <span
              :class="iconBtnCls('next', '-double')"
              @click="nextYear('right')">
              <Icon name="chevrons-right" />
            </span>
            <span
              v-if="rightPickerTable === 'date-table'"
              :class="iconBtnCls('next')"
              @click="nextMonth('right')"
              v-show="currentView === 'date'">
              <Icon name="chevron-right" />
            </span>
        </div>
        <component
          :is="rightPickerTable"
          ref="rightYearTable"
          :table-date="rightPanelDate"
          selection-mode="range"
          :range-state="rangeState"
          :disabled-date="disabledDate"
          :show-week-numbers="isWeek || showWeekNumbers"
          :is-week="isWeek"
          :value="preSelecting.right ? [dates[dates.length - 1]] : dates"
          :focused-date="focusedDate"
          :picker-type="pickerType"
          :week-start="weekStart"
          @change-range="handleChangeRange"
          @pick="panelPickerHandlers.right">
          <template slot-scope="scope" slot="cell">
            <slot :cell="scope.cell" name="cell"></slot>
          </template>
        </component>
      </div>
      <Confirm
        v-if="confirm"
        :show-time="showTime"
        :show-btn-now="showBtnNow"
        :time-disabled="timeDisabled"
        @toggle="handleToggleTime"
        @click-now="handlePickClickNow"
        @confirm="handlePickSuccess">
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
import PickerInput from '../../input.js';
import Icon from '@components/icon';

import {
  DEFAULT_FORMATS,
  TYPE_VALUE_RESOLVER_MAP,
  toDate,
  initTimeDate,
  formatDateLabels,
} from '@/utils/date';
import datePanelLabel from './date-panel-label.vue';

import Mixin from '../panel-mixin';
import DateMixin from './date-panel-mixin';
import Locale from '@/mixins/locale';

const dateSorter = (a, b) => {
  if (!a || !b) return 0;
  return a.getTime() - b.getTime();
};

export default {
  name: 'RangeDatePickerPanel',
  components: {
    DateTable,
    YearTable,
    MonthTable,
    TimePicker,
    Confirm,
    datePanelLabel,
    PickerInput,
    Icon,
  },
  mixins: [ Mixin, Locale, DateMixin ],
  inheritAttrs: false,
  props: {
    // more props in the mixin
    splitPanels: {
      type: Boolean,
      default: false,
    },
    defaultTime: {
      type: Array,
      default () {
        return [];
      },
    },
  },
  data () {
    const [minDate, maxDate] = this.value.map(date => date || initTimeDate());
    const leftPanelDate = this.startDate ? this.startDate : minDate;

    return {
      dates: [...this.value],
      rangeState: {
        from: this.value[0],
        to: this.value[1],
        selecting: minDate && !maxDate,
      },
      currentView: this.selectionMode || 'range',
      leftPickerTable: `${this.selectionMode}-table`,
      rightPickerTable: `${this.selectionMode}-table`,
      leftPanelDate: leftPanelDate,
      rightPanelDate: new Date(
        leftPanelDate.getFullYear(),
        leftPanelDate.getMonth() + 1,
        1,
      ),

      openLeftTime: false,
      openRightTime: false,
    };
  },
  computed: {
    isWeek () {
      return this.pickerType === 'weekrange';
    },
    classes () {
      const { prefix, panelPrefix } = this;
      return [
        `${panelPrefix}-body-wrapper`,
        `${prefix}-with-range`,
        {
          [`${panelPrefix}-with-sidebar`]: this.shortcuts.length,
          [`${prefix}-with-week-numbers`]: this.showWeekNumbers,
        },
      ];
    },
    panelBodyClasses () {
      const { panelPrefix } = this;
      return [
        panelPrefix + '-body',
        {
          [panelPrefix + '-body-time']: this.showTime,
          [panelPrefix + '-body-date']: !this.showTime,
        },
      ];
    },
    leftDatePanelLabel () {
      return this.panelLabelConfig('left');
    },
    rightDatePanelLabel () {
      return this.panelLabelConfig('right');
    },
    leftDatePanelView () {
      return this.leftPickerTable.split('-').shift();
    },
    rightDatePanelView () {
      return this.rightPickerTable.split('-').shift();
    },
    timeDisabled () {
      return !(this.dates[0] && this.dates[1]);
    },
    preSelecting () {
      const tableType = `${this.currentView}-table`;

      return {
        left: this.leftPickerTable !== tableType,
        right: this.rightPickerTable !== tableType,
      };
    },
    panelPickerHandlers () {
      return {
        left: this.preSelecting.left
          ? this.handlePreSelection.bind(this, 'left')
          : this.handleRangePick,
        right: this.preSelecting.right
          ? this.handlePreSelection.bind(this, 'right')
          : this.handleRangePick,
      };
    },
    leftTime () {
      return this.value[0] || '';
    },
    leftInput () {
      return this.leftTime ? this.formatDateToInput(this.leftTime, 'date')
        : '';
    },
    rightTime () {
      return this.value[1] || '';
    },
    rightInput () {
      return this.rightTime ? this.formatDateToInput(this.rightTime, 'date')
        : '';
    },
  },
  watch: {
    value (newVal) {
      this.handleValueChange(newVal);
    },
    currentView (currentView) {
      const leftMonth = this.leftPanelDate.getMonth();
      const rightMonth = this.rightPanelDate.getMonth();
      const isSameYear = this.leftPanelDate.getFullYear() ===
        this.rightPanelDate.getFullYear();

      if (currentView === 'date' && isSameYear && leftMonth === rightMonth) {
        this.changePanelDate('right', 'Month', 1);
      }
      if (currentView === 'month' && isSameYear) {
        this.changePanelDate('right', 'FullYear', 1);
      }
      if (currentView === 'year' && isSameYear) {
        this.changePanelDate('right', 'FullYear', 10);
      }
    },
    selectionMode (type) {
      this.currentView = type || 'range';
    },
    focusedDate (date) {
      this.setPanelDates(date || new Date());
    },
    visible (v) {
      if (!v) {
        this.handleValueChange(this.value);
      }
    },
  },
  created () {
    // 根据当前值设置左右面板
    this.setPanelDates(this.leftPanelDate);
  },
  methods: {
    handleValueChange (newVal) {
      const minDate = newVal[0] ? toDate(newVal[0]) : null;
      const maxDate = newVal[1] ? toDate(newVal[1]) : null;
      this.dates = [minDate, maxDate].sort(dateSorter);

      this.rangeState = {
        from: this.dates[0],
        to: this.dates[1],
        selecting: false,
      };

      // set panels positioning
      this.setPanelDates(this.startDate || this.dates[0] || new Date());
    },
    reset () {
      this.currentView = this.selectionMode;
      this.leftPickerTable = `${this.currentView}-table`;
      this.rightPickerTable = `${this.currentView}-table`;
    },
    setPanelDates (leftPanelDate) {
      this.leftPanelDate = leftPanelDate;
      let rightPanelDate;
      if (this.currentView === 'month') {
        rightPanelDate = new Date(
          leftPanelDate.getFullYear() + 1,
          leftPanelDate.getMonth(),
          1,
        );
      } else {
        rightPanelDate = new Date(
          leftPanelDate.getFullYear(),
          leftPanelDate.getMonth() + 1,
          1,
        );
      }
      this.rightPanelDate = this.splitPanels
        ? new Date(Math.max(this.dates[1], rightPanelDate))
        : rightPanelDate;
    },
    panelLabelConfig (direction) {
      const locale = this.t('el.locale');
      const datePanelLabel = this.t('el.datepicker.datePanelLabel');
      const handler = type => {
        const fn = type === 'month'
          ? this.showMonthPicker
          : this.showYearPicker;
        return () => fn(direction);
      };

      const date = this[`${direction}PanelDate`];
      const {
        labels,
        separator,
      } = formatDateLabels(locale, datePanelLabel, date);

      return {
        separator: separator,
        labels: labels.map(obj => {
          obj.handler = handler(obj.type);
          return obj;
        }),
      };
    },
    prevYear (panel) {
      const increment = this.currentView === 'year' ? -10 : -1;
      this.changePanelDate(panel, 'FullYear', increment);
    },
    nextYear (panel) {
      const increment = this.currentView === 'year' ? 10 : 1;
      this.changePanelDate(panel, 'FullYear', increment);
    },
    prevMonth (panel) {
      this.changePanelDate(panel, 'Month', -1);
    },
    nextMonth (panel) {
      this.changePanelDate(panel, 'Month', 1);
    },
    changePanelDate (panel, type, increment, updateOtherPanel = true) {
      const current = new Date(this[`${panel}PanelDate`]);
      current[`set${type}`](current[`get${type}`]() + increment);
      this[`${panel}PanelDate`] = current;

      if (!updateOtherPanel) return;

      if (this.splitPanels) {
        // change other panel if dates overlap
        const otherPanel = panel === 'left' ? 'right' : 'left';
        if (panel === 'left' && this.leftPanelDate >= this.rightPanelDate) {
          this.changePanelDate(otherPanel, type, 1);
        }
        if (panel === 'right' && this.rightPanelDate <= this.leftPanelDate) {
          this.changePanelDate(otherPanel, type, -1);
        }
      } else {
        // keep the panels together
        const otherPanel = panel === 'left' ? 'right' : 'left';
        const otherCurrent = new Date(this[`${otherPanel}PanelDate`]);
        otherCurrent[`set${type}`](otherCurrent[`get${type}`]() + increment);
        this[`${otherPanel}PanelDate`] = otherCurrent;
      }
    },
    showYearPicker (panel) {
      this[`${panel}PickerTable`] = 'year-table';
    },
    showMonthPicker (panel) {
      this[`${panel}PickerTable`] = 'month-table';
    },
    handlePreSelection (panel, value) {
      this[`${panel}PanelDate`] = value;
      const currentViewType = this[`${panel}PickerTable`];
      if (currentViewType === 'year-table') {
        this[`${panel}PickerTable`] = 'month-table';
      } else {
        this[`${panel}PickerTable`] = `${this.currentView}-table`;
      }

      if (!this.splitPanels) {
        const otherPanel = panel === 'left' ? 'right' : 'left';
        this[`${otherPanel}PanelDate`] = value;
        this.changePanelDate(otherPanel, 'Month', 1, false);
      }
    },

    setDefaultTime (date, oldDate, defaultTime) {
      const time = (defaultTime || '0:0:0').split(':');
      const hours = oldDate ? oldDate.getHours() : time[0];
      const mins = oldDate ? oldDate.getMinutes() : time[1];
      const sec = oldDate ? oldDate.getSeconds() : time[2];
      date.setHours(hours, mins, sec);
      return date;
    },

    handleRangePick (val, type) {
      if (this.rangeState.selecting || this.currentView === 'time') {
        if (this.currentView === 'time') {
          this.dates = val;
        } else {
          const [
            minDate,
            maxDate,
          ] = [this.rangeState.from, val].sort(dateSorter);

          const dates = [minDate, maxDate].map((date, i) => {
            return this.setDefaultTime(date, this.value[i], this.defaultTime[i]);
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
            selecting: false,
          };
        }
        this.handleConfirm(false, type || 'date');
      } else {
        this.rangeState = {
          from: val,
          to: null,
          selecting: true,
        };
      }
      this.$emit('pick-range', this.rangeState);
    },
    handleChangeRange (val) {
      if (!this.rangeState.selecting) {
        if (this.isWeek) {
          this.rangeState.from = val;
          this.rangeState.to = val;
        }
        return;
      }
      this.rangeState.to = val;
    },

    hanldeLeftTimeChange (time) {
      const left = this.dates[0];
      const hours = time ? time.getHours() : 0;
      const mins = time ? time.getMinutes() : 0;
      const sec = time ? time.getSeconds() : 0;
      const d = new Date(left);

      d.setHours(hours, mins, sec);

      this.dates[0] = d;
      // 保证 left time 一定小于 right time。
      // to fix ones(https://ones.sankuai.com/ones/product/4348/workItem/defect/detail/3167759)
      if (this.dates[0].getTime() > this.dates[1].getTime()) {
        this.dates[1].setHours(hours, mins, sec);
      }
      this.handleConfirm(false);
    },

    hanldeRightTimeChange (time) {
      const right = this.dates[1];

      const hours = time ? time.getHours() : 0;
      const mins = time ? time.getMinutes() : 0;
      const sec = time ? time.getSeconds() : 0;
      const d = new Date(right);

      d.setHours(hours, mins, sec);

      this.dates[1] = d;
      this.handleConfirm(false);
    },

    formatDateToInput (value, type) {
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
  },
};
</script>
