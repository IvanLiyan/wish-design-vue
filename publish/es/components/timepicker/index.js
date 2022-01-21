// todo 目前直接引用 date-picker 组件的文件，导致单独 datepicker、timepicker 包中都会
// 包含这个文件
import TimePicker from '@wish/wt-vue/es/components/datepicker/picker/timepicker.js';
import CreateComponent from '@wish/wt-vue/es/components/datepicker/control';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';

var WtTimePicker = withFormItem('WtTimePicker', CreateComponent('WtTimePicker', TimePicker), {
  withRef: true
});

/* istanbul ignore next */
WtTimePicker.install = function (Vue) {
  Vue.component(WtTimePicker.name, WtTimePicker);
};

export default WtTimePicker;