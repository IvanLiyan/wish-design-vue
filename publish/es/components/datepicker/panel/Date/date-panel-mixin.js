
import { initTimeDate } from '@wish/wt-vue/es/utils/date';

export default {
  props: {
    showTime: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    selectionMode: {
      type: String,
      validator: function validator(value) {
        return ['year', 'month', 'date', 'time'].indexOf(value) > -1;
      },

      default: 'date'
    },
    shortcuts: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabledDate: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    value: {
      type: Array,
      default: function _default() {
        return [initTimeDate(), initTimeDate()];
      }
    },
    timePickerOptions: {
      default: function _default() {
        return {};
      },
      type: Object
    },
    showWeekNumbers: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: Date
    },
    pickerType: {
      type: String,
      required: true
    },
    focusedDate: {
      type: Date,
      required: true
    },
    visible: Boolean,
    weekStart: {
      type: Number
    }
  },
  methods: {
    handleToggleTime: function handleToggleTime() {
      this.currentView = this.currentView === 'time' ? 'date' : 'time';
    }
  }
};