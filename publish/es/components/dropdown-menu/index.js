import DropdownMenu from './dropdown-menu';

/* istanbul ignore next */
DropdownMenu.install = function (Vue) {
  Vue.component(DropdownMenu.name, DropdownMenu);
};

export default DropdownMenu;