<template>
  <wt-table :data="tableData3">
    <wt-table-column
      prop="date"
      label="日期"
      width="150" />
    <wt-table-column label="配送信息">
      <wt-table-column
        prop="name"
        label="姓名"
        width="120" />
      <wt-table-column label="地址">
        <wt-table-column
          prop="province"
          label="省份"
          width="120" />
        <wt-table-column
          prop="city"
          label="市区"
          width="120" />
        <wt-table-column
          prop="address"
          label="地址"
          width="300" />
        <wt-table-column
          prop="zip"
          label="邮编"
          width="120" />
      </wt-table-column>
    </wt-table-column>
  </wt-table>
</template>

<script>
export default {
  data () {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-02',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-04',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-01',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-08',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-06',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-07',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        zip: 200333,
      }],
    };
  },
};
</script>
