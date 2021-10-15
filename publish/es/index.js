/* Automatically generated by './build/bin/build-entry.js' TODO 打开下面注释 */
import Button from './components/button';
import Row from './components/row';
import Col from './components/col';
import CollapseTransition from './transitions/collapse-transition';

var components = [Button, Row, Col, CollapseTransition];

export function install(Vue) {
  components.map(function (component) {
    Vue.component(component.name, component);
  });

  var $wd = {
    // confirm: Confirm,
    // notify: Notification,
    // message: Message,
  };

  Vue.prototype.$wd = $wd;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { Button, Row, Col, CollapseTransition };

export default {
  version: '0.0.2-alpha.16',
  install: install
};