import Sidebar from './sidebar.vue';
import createControl from './control';

const WtSidebar = createControl('WtSidebar', Sidebar);

/* istanbul ignore next */
WtSidebar.install = function (Vue) {
  Vue.component(WtSidebar.name, WtSidebar);
};
export default WtSidebar;
