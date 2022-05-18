import stepper from './stepper.vue';
import withStepper from './with';

export { withStepper };

/* istanbul ignore next */
stepper.install = function (Vue) {
  Vue.component(stepper.name, stepper);
};

export default stepper;
