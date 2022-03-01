import FormItem from './form-item';
import withFormItem from './with';

export { withFormItem };

/* istanbul ignore next */
FormItem.install = function (Vue) {
  Vue.component(FormItem.name, FormItem);
};

export default FormItem;