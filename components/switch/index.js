import Switch from './switch.vue';
import { withFormItem } from '@components/form-item';

/* istanbul ignore next */
const HocSwitch = withFormItem(Switch.name, Switch);

/* istanbul ignore next */
HocSwitch.install = function (Vue) {
  Vue.component(HocSwitch.name, HocSwitch);
};

export default HocSwitch;
