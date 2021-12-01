import DropdownMenu from './dropdown-menu.vue';

/* istanbul ignore next */
DropdownMenu.install = function (Vue) {
  Vue.component(DropdownMenu.name, DropdownMenu);
};

export default DropdownMenu;
