<template>
  <wt-table :data="data"
    @sort-change="onSortChange"
    :sort-order.sync="sortOrder">
    <wt-table-column label="label" prop="prop" />
    <wt-table-column label="label" prop="value" sortable="custom" />
  </wt-table>
</template>

<script>
import { triggerClick, waitImmediate } from '@test/util';

export default {
  name: 'TableCustomSortable',
  data () {
    const d = [
      { prop: 'test', value: 9 },
      { prop: 'test1', value: 11 },
      { prop: 'test2', value: 10 },
    ];
    return {
      origin: d,
      data: d,
      sortOrder: undefined,
      onSortChange: function () {},
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
      this.onSortChange = sinon.spy(this.onSortChange);

      await waitImmediate();
      const sortTh = this.$el.querySelector('thead .mtd-table-column-default:nth-child(2)');
      // 升序
      triggerClick(sortTh);
      expect(this.sortOrder).to.be.eql({ prop: 'value', order: 'ascending' });
      await waitImmediate();
      let datas = this.getSortData();
      expect(datas).to.be.eql(['9', '11', '10']);

      // 降序
      triggerClick(sortTh);
      expect(this.sortOrder).to.be.eql({ prop: 'value', order: 'descending' });
      await waitImmediate();
      datas = this.getSortData();
      expect(datas).to.be.eql(['9', '11', '10']);

      done();
    },
  },
};
</script>
