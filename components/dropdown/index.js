import Dropdown from './dropdown.vue';
import createControl from './control';
const WtDropdown = createControl('WtDropdown', Dropdown);
/* istanbul ignore next */
WtDropdown.install = function (Vue) {
  Vue.component(WtDropdown.name, WtDropdown);
};
export default WtDropdown;
