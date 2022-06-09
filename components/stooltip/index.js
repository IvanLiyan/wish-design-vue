import WtStooltip from './control.js';

/* istanbul ignore next */
WtStooltip.install = function (Vue) {
  Vue.component(WtStooltip.name, WtStooltip);
};

export default WtStooltip;
