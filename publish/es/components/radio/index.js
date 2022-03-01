import { withRadioGroup } from '@wish/wt-vue/es/components/radio-group';
import { withFormItem } from '@wish/wt-vue/es/components/form-item';
import Radio from './radio';

var HocRadio = withFormItem(Radio.name, withRadioGroup('', Radio));

/* istanbul ignore next */
HocRadio.install = function (Vue) {
  Vue.component(HocRadio.name, HocRadio);
};

/* istanbul ignore next */

export default HocRadio;