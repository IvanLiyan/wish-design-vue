import DropdownMenuItem from './dropdown-menu-item';

/* istanbul ignore next */
DropdownMenuItem.install = function (Vue) {
  Vue.component(DropdownMenuItem.name, DropdownMenuItem);
};

export default DropdownMenuItem;