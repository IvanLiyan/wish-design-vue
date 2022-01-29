import DatePicker from './picker/datepicker';
import CreateComponent from './control';
import RangeDatePickerPanel from './panel/Date/date-range';

var WtDatePicker = CreateComponent('WtDatePicker', DatePicker);

/* istanbul ignore next */
WtDatePicker.install = function (Vue) {
  Vue.component(WtDatePicker.name, WtDatePicker);
};

WtDatePicker.RangeDatePickerPanel = RangeDatePickerPanel;
export default WtDatePicker;