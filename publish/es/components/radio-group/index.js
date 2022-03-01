import RadioGroup from './radio-group';
import withRadioGroup from './with';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';

var HocRadioGroup = withFormItem(RadioGroup.name, RadioGroup);

export { withRadioGroup };

/* istanbul ignore next */
HocRadioGroup.install = function (Vue) {
  Vue.component(HocRadioGroup.name, HocRadioGroup);
};

export default HocRadioGroup;