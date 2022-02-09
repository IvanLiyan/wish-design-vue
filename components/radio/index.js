import { withRadioGroup } from '@components/radio-group';
import { withFormItem } from '@components/form-item';
import Radio from './radio.vue';

const HocRadio = withFormItem(Radio.name, withRadioGroup('', Radio));

/* istanbul ignore next */
HocRadio.install = function (Vue) {
  Vue.component(HocRadio.name, HocRadio);
};

/* istanbul ignore next */

export default HocRadio;
