import Drawer from './drawer';
import Inside from './inside';

Drawer.COMPONENT = Inside;

/* istanbul ignore next */
Drawer.install = function (Vue) {
  Vue.component(Drawer.name, Drawer);
};
export default Drawer;