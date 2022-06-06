import WtTooltip from './control.js';

/* istanbul ignore next */
WtTooltip.install = function (Vue) {
  Vue.component(WtTooltip.name, WtTooltip);
};

export default WtTooltip;