import { withRadioGroup } from '@components/radio-group';
import Radio from './radio.vue';

const RadioCom = withRadioGroup(Radio.name, Radio);

/* istanbul ignore next */
RadioCom.install = function (Vue) {
  Vue.component(RadioCom.name, RadioCom);
};

export default RadioCom;
