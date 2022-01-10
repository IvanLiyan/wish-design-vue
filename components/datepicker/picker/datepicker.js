import Picker from '../picker.vue';
import DatePickerPanel from '../panel/Date/date.vue';
import RangeDatePickerPanel from '../panel/Date/date-range.vue';

export default {
  name: 'DatePicker',
  mixins: [Picker],
  props: {
    type: {
      validator (value) {
        return [
          'year', 'month', 'date',
          'daterange', 'datetime',
          'datetimerange', 'week',
          'monthrange', 'weekrange',
        ].indexOf(value) > -1;
      },
      default: 'date',
    },
  },
  components: {
    DatePickerPanel,
    RangeDatePickerPanel,
  },
  computed: {
    panel () {
      const { type } = this;
      const isRange = type.indexOf('range') > -1;
      return isRange ? 'RangeDatePickerPanel' : 'DatePickerPanel';
    },
    ownPickerProps () {
      return this.options;
    },
  },
};
