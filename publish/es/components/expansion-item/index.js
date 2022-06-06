import { withExpansion } from '@wish/wt-vue/es/components/expansion';
import ExpansionItem from './expansion-item';
var WtExpansionItem = withExpansion('WtExpansionItem', ExpansionItem);

/* istanbul ignore next */
WtExpansionItem.install = function (Vue) {
  Vue.component(WtExpansionItem.name, WtExpansionItem);
};

export default WtExpansionItem;