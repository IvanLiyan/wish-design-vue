import TabPane from '../tab/src/tab-pane.vue';

/* istanbul ignore next */
TabPane.install = function (Vue) {
  Vue.component(TabPane.name, TabPane);
};

export default TabPane;
