<template>
  <div :class="classes">
    <span
      :class="getCellCls(cell)"
      v-for="(cell, i) in cells"
      :key="i"
      @click="handleClick(cell)"
      @mouseenter="handleMouseMove(cell)"
    ><em>{{ cell.desc }}</em>
    </span>
  </div>
</template>
<script>
import { clearHours, isInRange } from '@/utils/date';
import { deepCopy } from '@/utils/util';
import Locale from '@/mixins/locale';
import mixin from './mixin';
import { CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  mixins: [ Locale, mixin ],
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
        `${prefixCls}-month`,
      ];
    },
    cells () {
      const cells = [];
      const cellTmpl = {
        desc: '',
        selected: false,
        disabled: false,
        range: false,
      };
      const tableYear = this.tableDate.getFullYear();
      const selectedDays = this.dates.filter(Boolean)
        .map((date) => {
          return clearHours(new Date(date.getFullYear(), date.getMonth(), 1));
        });
      const focusedDate = clearHours(
        new Date(
          this.focusedDate.getFullYear(),
          this.focusedDate.getMonth(),
          1,
        ),
      );
      const isRange = this.selectionMode === 'range' && this.pickerType === 'monthrange';
      const { from, to } = this.rangeState;
      for (let i = 0; i < 12; i++) {
        const cell = deepCopy(cellTmpl);
        cell.date = new Date(tableYear, i, 1);
        cell.desc = this.tCell(i + 1);
        const day = clearHours(cell.date);
        cell.disabled = (this.selectionMode === 'month' || this.pickerType === 'monthrange') &&
          typeof this.disabledDate === 'function' &&
          this.disabledDate(cell.date);
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
    tCell (nr) {
      return this.t(`el.datepicker.months.m${nr}`);
    },
  },
};
</script>
