import { withRadioGroup } from '@wish/wt-vue/es/components/radio-group';
import Radio from './radio';

var RadioCom = withRadioGroup(Radio.name, Radio);

/* istanbul ignore next */
RadioCom.install = function (Vue) {
  Vue.component(RadioCom.name, RadioCom);
};

export default RadioCom;