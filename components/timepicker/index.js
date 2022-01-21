import TimePicker from '@components/datepicker/picker/timepicker.js';
import CreateComponent from '@components/datepicker/control';

const WtTimePicker = CreateComponent('WtTimePicker', TimePicker);

/* istanbul ignore next */
WtTimePicker.install = function (Vue) {
  Vue.component(WtTimePicker.name, WtTimePicker);
};

export default WtTimePicker;
