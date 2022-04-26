<template>
  <wt-table :data="tableData">
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
      label="地址">
      <template slot="header" slot-scope="scope">
        <i class="mtdicon mtdicon-location"></i> 地址
      </template>
    </wt-table-column>
  </wt-table>
</template>

<script>
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
    };
  },
};
</script>
