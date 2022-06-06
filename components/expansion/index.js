import Expansion from './expansion.vue';
import withExpansion from './with';

export { withExpansion };

Expansion.install = function (Vue) {
  Vue.component(Expansion.name, Expansion);
};
export default Expansion;
