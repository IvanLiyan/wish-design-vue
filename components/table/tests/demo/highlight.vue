<template>
  <wt-table :data="tableData"
    highlight-current-row
    row-key="date"
    @current-change="handleCurrentChange"
  >
    <wt-table-column
      prop="date"
      label="日期"
      width="180" />
    <wt-table-column
      prop="name"
      label="姓名"
      width="180" />
    <wt-table-column
      prop="address"
      label="地址" />
  </wt-table>
</template>
<script>
import {
  waitImmediate,
  triggerClick,
} from '@test/util';

export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
        tag: '家',
      }, {
        date: '2016-05-02',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
        tag: '公司',
      }, {
        date: '2016-05-04',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
        tag: '家',
      }, {
        date: '2016-05-01',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
        tag: '公司',
      }],
      handleCurrentChange () {},
    };
  },
  methods: {
    async doTest (done) {
      const spy = sinon.spy();
      this.handleCurrentChange = spy;
      await waitImmediate(); // wait data render

      let currentRow = this.$el.querySelector('.mtd-table-current-row');
      expect(currentRow).to.be.null();

      const firstTD = this.$el.querySelector('.mtd-table-body-wrapper tr td');
      triggerClick(firstTD, true, true);
      spy.should.have.been.calledOnce();

      await waitImmediate();
      currentRow = this.$el.querySelector('.mtd-table-current-row');
      expect(currentRow).to.be.not.null();
      expect(currentRow.querySelector('.mtd-table-column-default').innerText)
        .to.be.eql('2016-05-03');

      done();
    },
  },
};
</script>
