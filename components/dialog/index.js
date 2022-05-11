import Dialog from './dialog.vue';
import Inside from './inside.vue';

Dialog.COMPONENT = Inside;
/* istanbul ignore next */
Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog);
};
export default Dialog;
