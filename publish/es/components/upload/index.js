import { withFormItem } from '@wish/wt-vue/es/components/form-item';
import Upload from './upload';

var HocUpload = withFormItem(Upload.name, Upload);

/* istanbul ignore next */
HocUpload.install = function (Vue) {
  Vue.component(HocUpload.name, HocUpload);
};
export default HocUpload;