
import { clearHours, getFirstDayOfWeek, getLastDayOfWeek } from '@wish/wt-vue/es/utils/date';

export default {
  name: 'PanelTable',
  props: {
    tableDate: {
      type: Date,
      required: true
    },
    disabledDate: {
      type: Function
    },
    selectionMode: {
      type: String, // date,month,year,week,range
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    rangeState: {
      type: Object,
      required: true,
      default: function _default() {
        return {
          from: null,
          to: null,
          selecting: false
        };
      }
    },
    focusedDate: {
      type: Date,
      required: true
    },
    isWeek: Boolean,
    pickerType: String,
    weekStart: Number
  },
  computed: {
    dates: function dates() {
      var selectionMode = this.selectionMode,
          value = this.value,
          isWeek = this.isWeek,
          _rangeState = this.rangeState,
          selecting = _rangeState.selecting,
          from = _rangeState.from;

      var rangeSelecting = selectionMode === 'range' && selecting;
      var dates = value.filter(Boolean);
      if (isWeek) {
        var arr = !rangeSelecting ? dates : from ? [from] : [];
        return arr.length ? [getFirstDayOfWeek(arr[0], this.weekStart), getLastDayOfWeek(arr[arr.length - 1], this.weekStart)] : [];
      }
      return rangeSelecting ? from ? [from] : [] : dates;
    },
    state: function state() {
      var _rangeState2 = this.rangeState,
          from = _rangeState2.from,
          to = _rangeState2.to,
          selecting = _rangeState2.selecting;

      if (this.isWeek && from && to) {
        var arr = [from, to];
        arr = arr.sort(function (a, b) {
          return a.getTime() - b.getTime();
        });
        return {
          from: getFirstDayOfWeek(arr[0], this.weekStart),
          to: getLastDayOfWeek(arr[1], this.weekStart),
          selecting: selecting
        };
      }
      return this.rangeState || {};
    }
  },
  methods: {
    handleClick: function handleClick(cell) {
      if (cell.disabled || cell.type === 'weekLabel') return;
      var newDate = new Date(clearHours(cell.date));

      this.$emit('pick', newDate);
      this.$emit('pick-click');
    },
    handleMouseMove: function handleMouseMove(cell) {
      if (!this.isWeek && !this.state.selecting) return;
      if (cell.disabled) return;
      var newDate = cell.date;
      this.$emit('change-range', newDate);
    }
  }
};