<template>
  <wt-table :data="tableData">
    <wt-table-column
      prop="orderId"
      label="WOSP订单ID"
      width="200" />
    <wt-table-column
      prop="logId"
      label="物流追踪单号"
      width="180" />
    <wt-table-column
      prop="logStatus"
      label="物流状态" />
    <wt-table-column
      prop="orderStatus"
      label="订单状态" />
    <wt-table-column
      prop="channelNum"
      label="渠道号" />
    <wt-table-column
      prop="name"
      label="收件人" />
    <wt-table-column
      prop="addTime"
      label="创建时间" />
    <wt-table-column
      prop="control"
      label="操作" />
  </wt-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost订单已生成',
        orderStatus: 1,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: '',
      }, {
        orderId: 'WOSP021700118221DEU',
        logId: 'WI001117700472FPL',
        logStatus: 'Wishpost订单已生成',
        orderStatus: 1,
        channelNum: '5301',
        name: 'F.lli Gregorio Giuseppe',
        addTime: '2020-08-25 00:00:00',
        control: '',
      }],
    };
  },
};
</script>
