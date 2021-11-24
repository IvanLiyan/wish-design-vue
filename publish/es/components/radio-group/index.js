import RadioGroup from './radio-group';
import withRadioGroup from './with';

export { withRadioGroup };

/* istanbul ignore next */
RadioGroup.install = function (Vue) {
  Vue.component(RadioGroup.name, RadioGroup);
};

export default RadioGroup;