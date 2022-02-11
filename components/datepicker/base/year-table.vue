<template>
  <div :class="classes">
    <span
      :class="getCellCls(cell)"
      v-for="(cell, i) in cells"
      :key="i"
      @click="handleClick(cell)"
      @mouseenter="handleMouseMove(cell)"
    ><em>{{ cell.date.getFullYear() }}</em></span>
  </div>
</template>
<script>
import { clearHours, isInRange } from '@/utils/date';
import { deepCopy } from '@/utils/util';
import mixin from './mixin';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  mixins: [ mixin ],

  props: {/* in mixin */},
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
    prefixCls () {
      return `${this.prefix}-cells`;
    },
    classes () {
      const { prefixCls } = this;
      return [
        `${prefixCls}`,
        `${prefixCls}-year`,
      ];
    },
    startYear () {
      return Math.floor(this.tableDate.getFullYear() / 10) * 10;
    },
    cells () {
      const cells = [];
      const cellTmpl = {
        text: '',
        selected: false,
        disabled: false,
      };
      const tableYear = this.tableDate.getFullYear();

      const selectedDays = this.dates.filter(Boolean)
        .map((date) => {
          return clearHours(new Date(date.getFullYear(), 0, 1));
        });
      const focusedDate = clearHours(
        new Date(this.focusedDate.getFullYear(), 0, 1),
      );
      const isRange = this.selectionMode === 'range' && this.pickerType === 'yearrange';
      const { from, to } = this.rangeState;
      for (let i = 0; i < 12; i++) {
        const cell = deepCopy(cellTmpl);
        cell.date = new Date(this.startYear + i, 0, 1);
        cell.disabled = typeof this.disabledDate === 'function' &&
          this.disabledDate(cell.date) &&
          (this.selectionMode === 'year' || this.pickerType === 'yearrange');
        const day = clearHours(cell.date);
        cell.selected = (selectedDays.indexOf(day) > -1);
        cell.focused = day === focusedDate;
        if (isRange && !cell.selected) {
          const date = new Date(tableYear, i, 1, 0, 0, 0);
          cell.range = isInRange(date.getTime(), from && from.getTime(), to && to.getTime());
        }
        cells.push(cell);
      }
      return cells;
    },
  },
  methods: {
    getCellCls (cell) {
      const { prefixCls } = this;
      return [
        `${prefixCls}-cell`,
        {
          [`${prefixCls}-cell-selected`]: cell.selected,
          [`${prefixCls}-cell-disabled`]: cell.disabled,
          [`${prefixCls}-cell-focused`]: cell.focused,
          [`${prefixCls}-cell-range`]: cell.range && !cell.start && !cell.end,
        },
      ];
    },
  },
};
</script>
