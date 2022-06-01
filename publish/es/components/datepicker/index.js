import { withFormItem } from '@wish/wt-vue/es/components/form-item';
import DatePicker from './picker/datepicker';
import CreateComponent from './control';
import RangeDatePickerPanel from './panel/Date/date-range';

var HocDatePicker = withFormItem(DatePicker.name, CreateComponent(DatePicker.name, DatePicker));

/* istanbul ignore next */
HocDatePicker.install = function (Vue) {
  Vue.component(HocDatePicker.name, HocDatePicker);
};

HocDatePicker.RangeDatePickerPanel = RangeDatePickerPanel;
export default HocDatePicker;