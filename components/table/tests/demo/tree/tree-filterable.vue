<template>
<mtd-table :data="tableData" tree
  :expand-row-keys.sync="expands"
  row-key="id"
>
  <mtd-table-column
    prop="id"
    label="工单号"
    sortable
    :filters="[
      { text: '243304314806', value: '243304314806' },
      { text: '243304314807', value: '243304314807' },
      { text: '243304314809', value: '243304314809' },
    ]"
    :filter-method="filterName"
    :filtered-value.sync="filtered"
  />
  <mtd-table-column
    prop="status"
    label="状态"
    width="100" />
  <mtd-table-column
    prop="author"
    label="申请人"
    width="100"
  />
  <mtd-table-column
    prop="email"
    label="邮箱"
    width="220"
  />
</mtd-table>
</template>
<script>
import {
  findVM,
  waitImmediate,
} from '@test/util';
export default {
  data () {
    return {
      expands: ['243304314807'],
      tableData: [{
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
          id: '243304314807-1',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
          children: [{
            id: '243304314807-1-1',
            status: '已通过',
            author: '王维',
            email: 'wangwei@meituan.com',
          }, {
            id: '243304314807-2-1',
            status: '已通过',
            author: '王维',
            email: 'wangwei@meituan.com',
          }],
        }, {
          id: '243304314807-2',
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
        }, {
          id: '243304314807-3',
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
      filtered: [],
    };
  },
  methods: {
    filterName (value, row) {
      return value === row.id;
    },
    async doTest (done) {
      await waitImmediate();
      const table = findVM(this, { name: 'Table' });
      this.filtered = ['243304314809'];
      await waitImmediate();
      const data = table.store.states.data;
      expect(data.length).to.be.equal(1);
      expect(data[0].id).to.be.equal('243304314809');
      done();
    },
  },
};
</script>
