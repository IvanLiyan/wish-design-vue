import DropdownMenuItem from './dropdown-menu-item.vue';

/* istanbul ignore next */
DropdownMenuItem.install = function (Vue) {
  Vue.component(DropdownMenuItem.name, DropdownMenuItem);
};

export default DropdownMenuItem;
