/* Automatically generated by './build/bin/build-entry.js' TODO 打开下面注释 */
import Button from 'components/button';
import Row from 'components/row';
import Col from 'components/col';
import CollapseTransition from './transitions/collapse-transition';

const components = [
  Button,
  Row,
  Col,
  CollapseTransition,
];

export function install (Vue) {
  components.map(function (component) {
    Vue.component(component.name, component);
  });

  const $wd = {
    // confirm: Confirm,
    // notify: Notification,
    // message: Message,
  };

  if (Vue.prototype) Vue.prototype.$wd = $wd;
  if (Vue.config) Vue.config.globalProperties.$wd = $wd;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  Button,
  Row,
  Col,
  CollapseTransition,
};

export default {
  version: '0.0.2-alpha.19',
  install,
};
