import DatePicker from './picker/datepicker';
import CreateComponent from './control';
import { withFormItem } from '@components/form-item';
import RangeDatePickerPanel from './panel/Date/date-range.vue';

const WtDatePicker = withFormItem(
  'WtDatePicker',
  CreateComponent('DatePickerWrapper', DatePicker),
  {
    withRef: true,
    methods: {
      focus () {
        this.$refs.wrappedInstance.$refs.wrappedInstance.focus();
      },
      blur () {
        this.$refs.wrappedInstance.$refs.wrappedInstance.blur();
      },
    },
  },
);

/* istanbul ignore next */
WtDatePicker.install = function (Vue) {
  Vue.component(WtDatePicker.name, WtDatePicker);
};

WtDatePicker.RangeDatePickerPanel = RangeDatePickerPanel;
export default WtDatePicker;
