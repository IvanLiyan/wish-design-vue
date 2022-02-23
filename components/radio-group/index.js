import RadioGroup from './radio-group.vue';
import withRadioGroup from './with';
import { withFormItem } from '@components/form-item';

const HocRadioGroup = withFormItem(RadioGroup.name, RadioGroup);

export { withRadioGroup };

/* istanbul ignore next */
HocRadioGroup.install = function (Vue) {
  Vue.component(HocRadioGroup.name, HocRadioGroup);
};

export default HocRadioGroup;
