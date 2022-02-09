import { withCheckboxGroup } from '@components/checkbox-group';
import { withFormItem } from '@components/form-item';
import Checkbox from './checkbox.vue';

const HocCheckbox = withFormItem(Checkbox.name, withCheckboxGroup('', Checkbox));

/* istanbul ignore next */
HocCheckbox.install = function (Vue) {
  Vue.component(HocCheckbox.name, HocCheckbox);
};

export default HocCheckbox;
