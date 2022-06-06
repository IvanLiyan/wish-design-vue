import Dialog from './dialog';
import Inside from './inside';

Dialog.COMPONENT = Inside;
/* istanbul ignore next */
Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog);
};
export default Dialog;