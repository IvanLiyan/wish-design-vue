<template>
<wt-table :data="tableData" tree
  :expand-row-keys.sync="expands"
  row-key="id"
  :sort-order.sync="sortOrder"
>
  <wt-table-column
    prop="id"
    label="工单号"
    sortable
  />
  <wt-table-column
    prop="status"
    label="状态"
    width="100" />
  <wt-table-column
    prop="author"
    label="申请人"
    width="100"
  />
  <wt-table-column
    prop="email"
    label="邮箱"
    width="220"
  />
</wt-table>
</template>
<script>
import {
  findVM,
  waitImmediate,
} from '@test/util';

export default {
  data () {
    return {
      expands: [],
      tableData: [],
      store: [{
        id: '243304314806',
        status: '待审核',
        author: '白居易',
        email: 'baijuyi@meituan.com',
      }, {
        id: '243304314807',
        status: '已通过',
        author: '王维',
        email: 'wangwei@meituan.com',
        children: [{
          id: '243304314807-3',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
          children: [{
            id: '243304314807-3-1',
            status: '已通过',
            author: '王维',
            email: 'wangwei@meituan.com',
          }, {
            id: '243304314807-3-2',
            status: '已通过',
            author: '王维',
            email: 'wangwei@meituan.com',
          }],
        }, {
          id: '243304314807-1',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
        }, {
          id: '243304314807-2',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
        }],
      }, {
        id: '243304314808',
        status: '已通过',
        author: '王维',
        email: 'wangwei@meituan.com',
      }, {
        id: '243304314809',
        status: '已通过',
        author: '陶渊明',
        email: 'taoyuanmming@meituan.com',
        children: [{
          id: '243304314809-1',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
        }, {
          id: '243304314809-2',
          status: '已驳回',
          author: '陶渊明',
          email: 'taoyuanmming@meituan.com',
        }],
      }],
      sortOrder: {
        order: 'ascending',
        prop: 'id',
      },
    };
  },
  methods: {
    async doTest (done) {
      this.tableData = this.store;
      this.expands = ['243304314807'];
      await waitImmediate();
      const table = findVM(this, { name: 'Table' });
      let data = table.store.states.data;
      let ids = data.map((item) => item.id);

      expect(ids).to.be.eql([
        '243304314806',
        '243304314807',
        '243304314807-1',
        '243304314807-2',
        '243304314807-3',
        '243304314808',
        '243304314809',
      ], 'ascending');

      this.sortOrder = {
        order: 'descending',
        prop: 'id',
      };
      await waitImmediate();
      data = table.store.states.data;
      ids = data.map((item) => item.id);

      expect(ids).to.be.eql([
        '243304314809',
        '243304314808',
        '243304314807',
        '243304314807-3',
        '243304314807-2',
        '243304314807-1',
        '243304314806',
      ], 'descending');

      done();
    },
  },
};
</script>
