import { withCheckboxGroup } from '@components/checkbox-group';
import Checkbox from './checkbox.vue';

const HocCheckbox = withCheckboxGroup(Checkbox.name, Checkbox);

/* istanbul ignore next */
HocCheckbox.install = function (Vue) {
  Vue.component(HocCheckbox.name, HocCheckbox);
};

export default HocCheckbox;
