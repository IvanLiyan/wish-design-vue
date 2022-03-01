import { withCheckboxGroup } from '@wish/wt-vue/es/components/checkbox-group';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';
import Checkbox from './checkbox';

var HocCheckbox = withFormItem(Checkbox.name, withCheckboxGroup('', Checkbox));

/* istanbul ignore next */
HocCheckbox.install = function (Vue) {
  Vue.component(HocCheckbox.name, HocCheckbox);
};

export default HocCheckbox;