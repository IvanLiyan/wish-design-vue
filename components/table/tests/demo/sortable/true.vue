<template>
  <wt-table :data="data" :sort-order.sync="sortOrder">
    <wt-table-column label="label" prop="prop" />
    <wt-table-column label="label" prop="value" sortable />
  </wt-table>
</template>

<script>
import { triggerClick, waitImmediate } from '@test/util';

export default {
  name: 'TableSrotable',
  data () {
    return {
      data: [{ prop: 'test', value: 9 }, { prop: 'test1', value: 11 }, { prop: 'test2', value: 10 }],
      sortOrder: undefined,
    };
  },
  methods: {
    getSortData () {
      const tds = this.$el.querySelectorAll('.mtd-table-row .mtd-table-column-default:nth-child(2)');
      const array = [];
      tds.forEach((el) => {
        array.push(el.innerText);
      });
      return array;
    },
    async doTest (done) {
      await waitImmediate();
      const sortTh = this.$el.querySelector('thead .mtd-table-column-default:nth-child(2)');
      // 升序
      triggerClick(sortTh);
      expect(this.sortOrder).to.be.eql({ prop: 'value', order: 'ascending' });
      await waitImmediate();
      let datas = this.getSortData();
      expect(datas).to.be.eql(['9', '10', '11']);

      // 降序
      triggerClick(sortTh);
      expect(this.sortOrder).to.be.eql({ prop: 'value', order: 'descending' });
      await waitImmediate();
      datas = this.getSortData();
      expect(datas).to.be.eql(['11', '10', '9']);

      done();
    },
  },
};
</script>
