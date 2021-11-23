import CheckboxGroup from './checkbox-group.vue';
import withCheckboxGroup from './with';

export { withCheckboxGroup };

/* istanbul ignore next */
CheckboxGroup.install = function (Vue) {
  Vue.component(CheckboxGroup.name, CheckboxGroup);
};

export default CheckboxGroup;
