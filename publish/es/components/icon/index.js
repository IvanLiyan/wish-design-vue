import Icon from './icon';
import 'feather-icons';

/* istanbul ignore next */
Icon.install = function (Vue) {
  Vue.component(Icon.name, Icon);
};

export default Icon;