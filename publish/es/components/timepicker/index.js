import TimePicker from '@wish/wt-vue/es/components/datepicker/picker/timepicker.js';
import CreateComponent from '@wish/wt-vue/es/components/datepicker/control';

var WtTimePicker = CreateComponent('WtTimePicker', TimePicker);

/* istanbul ignore next */
WtTimePicker.install = function (Vue) {
  Vue.component(WtTimePicker.name, WtTimePicker);
};

export default WtTimePicker;