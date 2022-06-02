import Drawer from './drawer.vue';
import Inside from './inside.vue';

Drawer.COMPONENT = Inside;

/* istanbul ignore next */
Drawer.install = function (Vue) {
  Vue.component(Drawer.name, Drawer);
};
export default Drawer;
