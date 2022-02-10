<template>
  <div :class="{
      [`${prefix}-cells`]: true,
      [`${prefix}-cells-show-week-numbers`]: showWeekNumbers,
      [`${prefix}-week-cells`]: isWeek,
    }">
    <div :class="[`${prefix}-cells-header`]">
      <span v-for="day in headerDays" :key="day"><em class="header-em">{{ day }}</em></span>
    </div>
    <span
      :class="[`${prefix}-cells-cell`, getCellCls(cell)]"
      v-for="(cell, i) in cells"
      :key="String(cell.date) + i"
      @click="handleClick(cell, $event)"
      @mouseenter="handleMouseMove(cell)"
    >
      <em v-if="cell.type !== 'weekLabel'">
        <slot :cell="cell" name="cell"> {{ cell.desc }} </slot>
      </em>
      <em v-else>{{ cell.desc }}</em>
    </span>
  </div>
</template>
<script>
import {
  clearHours, isInRange,
} from '@/utils/date';
import Locale from '@/mixins/locale';
import jsCalendar from '@/js-calendar';

import mixin from './mixin';
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  mixins: [ Locale, mixin ],

  props: {
    /* more props in mixin */
    showWeekNumbers: {
      type: Boolean,
      default: false,
    },

  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('date-picker');
    },
    calendar () {
      return new jsCalendar.Generator({
        onlyDays: !this.showWeekNumbers,
        weekStart: this.weekStart,
      });
    },
    headerDays () {
      const { weekStart } = this;
      const translatedDays = [
        'sun', 'mon', 'tue',
        'wed', 'thu', 'fri',
        'sat',
      ].map(item => {
        return this.t('el.datepicker.weeks.' + item);
      });
      const weekDays = translatedDays.splice(weekStart, 7 - weekStart)
        .concat(translatedDays.splice(0, weekStart));
      return this.showWeekNumbers ? [''].concat(weekDays) : weekDays;
    },
    cells () {
      const { isWeek } = this;
      const tableYear = this.tableDate.getFullYear();
      const tableMonth = this.tableDate.getMonth();

      // timestamp of today
      const today = clearHours(new Date());

      // timestamp of selected days
      const selectedDays = this.dates.map(clearHours);

      const rangeStart = this.state.from &&
        clearHours(this.state.from);
      const rangeEnd = this.state.to && clearHours(this.state.to);
      const rangeDates = [[rangeStart, rangeEnd]];

      if (isWeek) {
        const minDay = selectedDays[0];
        const maxDay = selectedDays[selectedDays.length - 1];
        rangeDates.push([minDay, maxDay]);
      }

      const singleWeek = this.selectionMode === 'week';
      const isRange = this.selectionMode === 'range' || singleWeek;
      const disabledTestFn = typeof this.disabledDate === 'function' &&
        this.disabledDate;
      return this.calendar(tableYear, tableMonth, (cell) => {
        const time = cell.date && clearHours(cell.date);
        const dateIsInCurrentMonth = cell.type === 'monthDay';
        const selected = time && ((isWeek && singleWeek) || dateIsInCurrentMonth) &&
            (selectedDays.indexOf(time) > -1);
        return {
          ...cell,
          type: time === today ? 'today' : cell.type,
          selected: selected,
          disabled: (cell.date && disabledTestFn) &&
            disabledTestFn(new Date(time)),
          range: time && !selected && isRange && (dateIsInCurrentMonth || isWeek) &&
            (rangeDates.some((dates) => isInRange(time, dates[0], dates[1]))),
        };
      }).cells;
    },
  },
  methods: {
    getCellCls (cell) {
      const { prefix } = this;
      const prefixCls = `${prefix}-cells`;
      return [
        {
          [`${prefixCls}-cell-selected`]: cell.selected || cell.start ||
            cell.end,
          [`${prefixCls}-cell-disabled`]: cell.disabled,
          [`${prefixCls}-cell-today`]: cell.type === 'today',
          [`${prefixCls}-cell-prev-month`]: cell.type === 'prevMonth',
          [`${prefixCls}-cell-next-month`]: cell.type === 'nextMonth',
          [`${prefixCls}-cell-week-label`]: cell.type === 'weekLabel',
          [`${prefixCls}-cell-range`]: cell.range && !cell.start && !cell.end,
          [`${prefixCls}-focused`]: clearHours(cell.date) ===
            clearHours(this.focusedDate),
        },
      ];
    },

  },
};
</script>
