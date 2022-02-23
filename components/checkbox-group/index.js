import CheckboxGroup from './checkbox-group.vue';
import withCheckboxGroup from './with';
import { withFormItem } from '@components/form-item';

const HocCheckboxGroup = withFormItem(CheckboxGroup.name, CheckboxGroup);

export { withCheckboxGroup };

/* istanbul ignore next */
HocCheckboxGroup.install = function (Vue) {
  Vue.component(HocCheckboxGroup.name, HocCheckboxGroup);
};

export default HocCheckboxGroup;
