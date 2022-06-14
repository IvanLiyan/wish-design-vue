import Sidebar from './sidebar';
import createControl from './control';

var WtSidebar = createControl('WtSidebar', Sidebar);

/* istanbul ignore next */
WtSidebar.install = function (Vue) {
  Vue.component(WtSidebar.name, WtSidebar);
};
export default WtSidebar;