import Popover from './control.js';

/* istanbul ignore next */
Popover.install = function (Vue) {
  Vue.component(Popover.name, Popover);
};

export default Popover;