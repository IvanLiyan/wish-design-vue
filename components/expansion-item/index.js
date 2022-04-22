import { withExpansion } from '@components/expansion';
import ExpansionItem from './expansion-item.vue';
const WtExpansionItem = withExpansion('WtExpansionItem', ExpansionItem);

/* istanbul ignore next */
WtExpansionItem.install = function (Vue) {
  Vue.component(WtExpansionItem.name, WtExpansionItem);
};

export default WtExpansionItem;
