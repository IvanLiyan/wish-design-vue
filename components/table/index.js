import createTable from './control';
import Table from './src/table';

const WtTable = createTable('WtTable', Table);

WtTable.install = function (Vue) {
  Vue.component(WtTable.name, WtTable);
};

export default WtTable;
