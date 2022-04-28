<template>
  <div>
    <p>固定表头</p>
    <wt-table :data="tableData3" height="250" bordered style="margin-bottom: 40px;">
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

    <p>固定列</p>
    <wt-table :data="tableData3" bordered>
      <wt-table-column
        fixed
        prop="date"
        label="日期"
        width="150" />
      <wt-table-column
        prop="name"
        label="姓名"
        width="120" />
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
      <wt-table-column
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <mtd-button @click="handleClick(scope.row)" type="text" size="small">查看</mtd-button>
          <mtd-button type="text" size="small">编辑</mtd-button>
        </template>
      </wt-table-column>
    </wt-table>
  </div>
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
        address: '北京市朝阳区望京东路四号 1518',
        detailAddress: '望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-02',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        detailAddress: '望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-04',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        detailAddress: '望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-01',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        detailAddress: '望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-08',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        detailAddress: '望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-06',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        detailAddress: '望京东路四号',
        zip: 200333,
      }, {
        date: '2016-05-07',
        name: '美小团',
        province: '北京',
        city: '朝阳区',
        address: '北京市朝阳区望京东路四号',
        detailAddress: '望京东路四号',
        zip: 200333,
      }],
    };
  },
};
</script>
