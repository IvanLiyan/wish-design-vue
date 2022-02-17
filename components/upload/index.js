import { withFormItem } from '@components/form-item';
import Upload from './upload.vue';

const HocUpload = withFormItem(Upload.name, Upload);

/* istanbul ignore next */
Upload.install = function (Vue) {
  Vue.component(HocUpload.name, HocUpload);
};
export default Upload;
