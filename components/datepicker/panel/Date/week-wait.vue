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
      <div :class="[prefix + '-header']">
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
          :table-date="panelDate"
          :show-week-numbers="true"
          :week-start="weekStart"
          :value="dates"
          :range-state="rangeState"
          selection-mode="range"
          :disabled-date="disabledDate"
          :focused-date="focusedDate"
          :is-week="true"
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
  getFirstDayOfWeek,
  getLastDayOfWeek,
} from '@/utils/date';

export default {
  name: 'WeekPickerPanel',
  components: {
    DateTable,
    YearTable,
    MonthTable,
    datePanelLabel,
    Confirm,
    PickerInput,
    Icon,
  },
  mixins: [ Mixin, Locale, DateMixin ],
  inheritAttrs: false,
  props: {
    visible: Boolean,
  },
  data () {
    const {selectionMode, value} = this;
    const first = value[0];
    const dates = first ? [getFirstDayOfWeek(first, this.weekStart), getLastDayOfWeek(first, this.weekStart)] : [];
    return {
      currentView: selectionMode || 'range',
      pickerTable: this.getTableType(selectionMode),
      dates: dates,
      rangeState: {
        from: dates[0],
        to: dates[1],
        selecting: false,
      },
      panelDate: this.startDate || dates[0] || new Date(),
    };
  },
  computed: {
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
  },
  watch: {
    value (newVal) {
      this.handleValueChange(newVal);
    },
    pickerTable () {
      this.$emit('current-view-change');
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
    visible (visible) {
      this.handleValueChange(this.value);
    },
  },
  methods: {
    handleValueChange (newVal) {
      const first = newVal[0];
      const dates = first ? [getFirstDayOfWeek(first, this.weekStart), getLastDayOfWeek(first, this.weekStart)] : [];
      this.dates = dates;
      this.rangeState = {
        from: dates[0],
        to: dates[1],
        selecting: false,
      };
      this.panelDate = this.startDate || dates[0] || new Date();
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
      return `${currentView}-table`;
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

      this.dates = [value];
      this.$emit('pick', value, false);
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
      if (val) {
        const [from, to] = [getFirstDayOfWeek(val, this.weekStart), getLastDayOfWeek(val, this.weekStart)];
        this.rangeState.from = from;
        this.rangeState.to = to;
      }
    },
  },
};
</script>
