<template>
<wt-table :data="tableData" tree
  :expand-row-keys.sync="expands"
  row-key="id"
>
  <wt-table-column
    prop="id"
    label="工单号"
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
import { findVM } from '@test/util';

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
    };
  },
  methods: {
    doTest (done) {
      const table = findVM(this, { name: 'Table' });
      const data = table.store.states.data;
      const ids = data.map((item) => item.id);

      expect(ids).to.be.eql([
        '243304314806',
        '243304314807',
        '243304314807-1',
        '243304314807-2',
        '243304314807-3',
        '243304314808',
        '243304314809',
      ]);
      done();
    },
  },
};
</script>
