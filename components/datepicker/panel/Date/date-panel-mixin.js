
import { initTimeDate } from '@/utils/date';

export default {
  props: {
    showTime: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    selectionMode: {
      type: String,
      validator (value) {
        return ['year', 'month', 'date', 'time'].indexOf(value) > -1;
      },
      default: 'date',
    },
    shortcuts: {
      type: Array,
      default: () => [],
    },
    disabledDate: {
      type: Function,
      default: () => false,
    },
    value: {
      type: Array,
      default: () => [initTimeDate(), initTimeDate()],
    },
    timePickerOptions: {
      default: () => ({}),
      type: Object,
    },
    showWeekNumbers: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
    },
    pickerType: {
      type: String,
      required: true,
    },
    focusedDate: {
      type: Date,
      required: true,
    },
    visible: Boolean,
    weekStart: {
      type: Number,
    },
  },
  methods: {
    handleToggleTime () {
      this.currentView = this.currentView === 'time' ? 'date' : 'time';
    },
  },
};
