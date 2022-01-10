
import {
  clearHours,
  getFirstDayOfWeek,
  getLastDayOfWeek,
} from '@/utils/date';

export default {
  name: 'PanelTable',
  props: {
    tableDate: {
      type: Date,
      required: true,
    },
    disabledDate: {
      type: Function,
    },
    selectionMode: {
      type: String, // date,month,year,week,range
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
    rangeState: {
      type: Object,
      required: true,
      default: () => ({
        from: null,
        to: null,
        selecting: false,
      }),
    },
    focusedDate: {
      type: Date,
      required: true,
    },
    isWeek: Boolean,
    pickerType: String,
    weekStart: Number,
  },
  computed: {
    dates () {
      const { selectionMode, value, isWeek, rangeState: { selecting, from } } = this;
      const rangeSelecting = selectionMode === 'range' && selecting;
      const dates = value.filter(Boolean);
      if (isWeek) {
        const arr = !rangeSelecting ? dates : (from ? [from] : []);
        return arr.length ? [
          getFirstDayOfWeek(arr[0], this.weekStart),
          getLastDayOfWeek(arr[arr.length - 1], this.weekStart),
        ] : [];
      }
      return rangeSelecting ? (from ? [from] : []) : dates;
    },
    state () {
      const { rangeState: { from, to, selecting } } = this;
      if (this.isWeek && from && to) {
        let arr = [from, to];
        arr = arr.sort((a, b) => a.getTime() - b.getTime());
        return {
          from: getFirstDayOfWeek(arr[0], this.weekStart),
          to: getLastDayOfWeek(arr[1], this.weekStart),
          selecting: selecting,
        };
      }
      return this.rangeState || {};
    },
  },
  methods: {
    handleClick (cell) {
      if (cell.disabled || cell.type === 'weekLabel') return;
      const newDate = new Date(clearHours(cell.date));

      this.$emit('pick', newDate);
      this.$emit('pick-click');
    },
    handleMouseMove (cell) {
      if (!this.isWeek && !this.state.selecting) return;
      if (cell.disabled) return;
      const newDate = cell.date;
      this.$emit('change-range', newDate);
    },
  },
};
