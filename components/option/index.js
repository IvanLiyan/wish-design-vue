import Option from './option';

/* istanbul ignore next */
Option.install = function (Vue) {
  Vue.component(Option.name, Option);
};

export default Option;
