import DatePicker from './picker/datepicker';
import CreateComponent from './control';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';
import RangeDatePickerPanel from './panel/Date/date-range';

var WtDatePicker = withFormItem('WtDatePicker', CreateComponent('DatePickerWrapper', DatePicker), {
  withRef: true,
  methods: {
    focus: function focus() {
      this.$refs.wrappedInstance.$refs.wrappedInstance.focus();
    },
    blur: function blur() {
      this.$refs.wrappedInstance.$refs.wrappedInstance.blur();
    }
  }
});

/* istanbul ignore next */
WtDatePicker.install = function (Vue) {
  Vue.component(WtDatePicker.name, WtDatePicker);
};

WtDatePicker.RangeDatePickerPanel = RangeDatePickerPanel;
export default WtDatePicker;