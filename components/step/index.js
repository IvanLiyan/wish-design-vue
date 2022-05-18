import Step from '../stepper/step';
import { withStepper } from '@components/stepper';

const WtStep = withStepper('WtStep', Step);

/* istanbul ignore next */
WtStep.install = function (Vue) {
  Vue.component(WtStep.name, WtStep);
};

export default WtStep;
