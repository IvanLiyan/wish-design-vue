import TimePicker from '@wish/wt-vue/es/components/datepicker/picker/timepicker.js';
import CreateComponent from '@wish/wt-vue/es/components/datepicker/control';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';

var HocTimePicker = withFormItem(TimePicker.name, CreateComponent(TimePicker.name, TimePicker));

/* istanbul ignore next */
HocTimePicker.install = function (Vue) {
  Vue.component(HocTimePicker.name, HocTimePicker);
};

export default HocTimePicker;