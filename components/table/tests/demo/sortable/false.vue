<template>
  <wt-table :data="data" :sort-order.sync="sortOrder">
    <wt-table-column label="label" prop="prop" />
    <wt-table-column label="label" prop="value" :sortable="false" />
  </wt-table>
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
