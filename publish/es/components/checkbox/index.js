import { withCheckboxGroup } from '@wish/wt-vue/es/components/checkbox-group';
import Checkbox from './checkbox';

var HocCheckbox = withCheckboxGroup(Checkbox.name, Checkbox);

/* istanbul ignore next */
HocCheckbox.install = function (Vue) {
  Vue.component(HocCheckbox.name, HocCheckbox);
};

export default HocCheckbox;