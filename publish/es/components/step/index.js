import Step from '../stepper/step';
import { withStepper } from '@wish/wt-vue/es/components/stepper';

var WtStep = withStepper('WtStep', Step);

/* istanbul ignore next */
WtStep.install = function (Vue) {
  Vue.component(WtStep.name, WtStep);
};

export default WtStep;