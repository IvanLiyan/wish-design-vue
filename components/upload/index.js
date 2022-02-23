import { withFormItem } from '@components/form-item';
import Upload from './upload.vue';

const HocUpload = withFormItem(Upload.name, Upload);

/* istanbul ignore next */
HocUpload.install = function (Vue) {
  Vue.component(HocUpload.name, HocUpload);
};
export default HocUpload;
