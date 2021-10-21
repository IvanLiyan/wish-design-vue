import Icon from './icon.vue';
import 'feather-icons';

/* istanbul ignore next */
Icon.install = function (Vue) {
  Vue.component(Icon.name, Icon);
};

export default Icon;
