import Dropdown from './dropdown';
import createControl from './control';
var WtDropdown = createControl('WtDropdown', Dropdown);
/* istanbul ignore next */
WtDropdown.install = function (Vue) {
  Vue.component(WtDropdown.name, WtDropdown);
};
export default WtDropdown;