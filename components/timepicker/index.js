import TimePicker from '@components/datepicker/picker/timepicker.js';
import CreateComponent from '@components/datepicker/control';
import { withFormItem } from '@components/form-item';

const HocTimePicker = withFormItem(TimePicker.name, CreateComponent(TimePicker.name, TimePicker));

/* istanbul ignore next */
HocTimePicker.install = function (Vue) {
  Vue.component(HocTimePicker.name, HocTimePicker);
};

export default HocTimePicker;
