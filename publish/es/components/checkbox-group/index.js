import CheckboxGroup from './checkbox-group';
import withCheckboxGroup from './with';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';

var HocCheckboxGroup = withFormItem(CheckboxGroup.name, CheckboxGroup);

export { withCheckboxGroup };

/* istanbul ignore next */
HocCheckboxGroup.install = function (Vue) {
  Vue.component(HocCheckboxGroup.name, HocCheckboxGroup);
};

export default HocCheckboxGroup;