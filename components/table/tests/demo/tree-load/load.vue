<template>
<wt-table :data="tableData" tree
  :expand-row-keys.sync="expands"
  row-key="id"
  :row-class="rowClass"
  :load-data="loadData"
>
  <wt-table-column
    prop="id"
    label="工单号"
    sortable
    :filters="[
      { text: '243304314806', value: '243304314806' },
      { text: '243304314807', value: '243304314807' },
      { text: '243304314809', value: '243304314809' },
    ]"
    :filter-method="filterName"
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
  wait,
  waitImmediate,
  triggerClick,
} from '@test/util';
export default {
  data () {
    return {
      expands: [],
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
            id: '243304314807-1-2',
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
      loadData: sinon.spy(this.load),
    };
  },
  methods: {
    rowClass ({ row }) {
      return `row-${row.id}`;
    },
    filterName (value, row) {
      return value === row.id;
    },
    load (row, callback) {
      const { id } = row;
      setTimeout(() => {
        callback([{
          id: `${id}-1`,
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
          isLeaf: true,
        }, {
          id: `${id}-2`,
          status: '已通过',
          author: '王维',
          email: 'wangwei@meituan.com',
          isLeaf: true,
        }]);
      }, 100);
    },
    async doTest (done) {
      await waitImmediate();
      const icon = this.$el.querySelector('.row-243304314806 .mtd-table-tree-expand-icon');
      expect(icon).to.be.ok();
      triggerClick(icon);
      await wait(300);

      expect(this.expands).to.be.eql([
        '243304314806',
      ]);
      this.loadData.should.been.calledOnce();
      const table = findVM(this, { name: 'Table' });
      let data = table.store.states.data;
      let ids = data.map((row) => {
        return row.id;
      });
      expect(ids).to.be.eql([
        '243304314806',
        '243304314806-1',
        '243304314806-2',
        '243304314807',
        '243304314808',
        '243304314809',
      ], 'remote load children');

      const icon2 = this.$el.querySelector('.row-243304314807 .mtd-table-tree-expand-icon');
      expect(icon2).to.be.ok();
      triggerClick(icon2);
      await wait(300);
      expect(this.expands).to.be.eql([
        '243304314806',
        '243304314807',
      ]);

      // not call loadData more
      this.loadData.should.been.calledOnce();
      data = table.store.states.data;
      ids = data.map((row) => {
        return row.id;
      });
      expect(ids).to.be.eql([
        '243304314806',
        '243304314806-1',
        '243304314806-2',
        '243304314807',
        '243304314807-1',
        '243304314807-2',
        '243304314807-3',
        '243304314808',
        '243304314809',
      ], 'expanded local');
      done();
    },
  },
};
</script>
