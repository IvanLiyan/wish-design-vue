import Switch from './switch';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';

/* istanbul ignore next */
var HocSwitch = withFormItem(Switch.name, Switch);

/* istanbul ignore next */
HocSwitch.install = function (Vue) {
  Vue.component(HocSwitch.name, HocSwitch);
};

export default HocSwitch;