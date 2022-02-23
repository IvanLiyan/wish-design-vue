import TabDrop from '../tab/src/tab-drop.vue';

/* istanbul ignore next */
TabDrop.install = function (Vue) {
  Vue.component(TabDrop.name, TabDrop);
};

export default TabDrop;
