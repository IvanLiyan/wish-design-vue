// todo 目前直接引用 date-picker 组件的文件，导致单独 datepicker、timepicker 包中都会
// 包含这个文件
import TimePicker from '@components/datepicker/picker/timepicker.js';
import CreateComponent from '@components/datepicker/control';
import { withFormItem } from '@components/form-item';

const WtTimePicker = withFormItem(
  'WtTimePicker',
  CreateComponent('WtTimePicker', TimePicker),
  {
    withRef: true,
  },
);

/* istanbul ignore next */
WtTimePicker.install = function (Vue) {
  Vue.component(WtTimePicker.name, WtTimePicker);
};

export default WtTimePicker;
