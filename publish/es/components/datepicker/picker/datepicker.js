import Picker from '../picker';
import DatePickerPanel from '../panel/Date/date';
import RangeDatePickerPanel from '../panel/Date/date-range';

export default {
  name: 'WtDatePicker',
  mixins: [Picker],
  props: {
    type: {
      validator: function validator(value) {
        return ['year', 'month', 'date', 'daterange', 'datetime', 'datetimerange', 'week', 'monthrange', 'weekrange', 'yearrange'].indexOf(value) > -1;
      },

      default: 'date'
    }
  },
  components: {
    DatePickerPanel: DatePickerPanel,
    RangeDatePickerPanel: RangeDatePickerPanel
  },
  computed: {
    panel: function panel() {
      var type = this.type;

      var isRange = type.indexOf('range') > -1;
      return isRange ? 'RangeDatePickerPanel' : 'DatePickerPanel';
    },
    ownPickerProps: function ownPickerProps() {
      return this.options;
    }
  }
};