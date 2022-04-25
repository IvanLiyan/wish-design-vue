<template>
  <mtd-table :data="data" :sort-order.sync="sortOrder">
    <mtd-table-column label="label" prop="prop" />
    <mtd-table-column label="label" prop="value" :sortable="false" />
  </mtd-table>
</template>

<script>
import { triggerClick, waitImmediate } from '@test/util';

export default {
  name: 'TableUnSrotable',
  data () {
    return {
      data: [{ prop: 'test', value: 9 }, { prop: 'test1', value: 11 }, { prop: 'test2', value: 10 }],
      sortOrder: undefined,
    };
  },
  methods: {
    async doTest (done) {
      await waitImmediate();
      const sortTh = this.$el.querySelector('thead .mtd-table-column-default:nth-child(2)');
      // 升序
      triggerClick(sortTh);
      expect(this.sortOrder).to.be.undefined();
      done();
    },
  },
};
</script>
