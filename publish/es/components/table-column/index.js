import WtTableColumn from '../table/src/table-column';

/* istanbul ignore next */
WtTableColumn.install = function (Vue) {
  Vue.component(WtTableColumn.name, WtTableColumn);
};

export default WtTableColumn;